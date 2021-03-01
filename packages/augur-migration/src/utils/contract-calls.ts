import BigNumber, { BigNumber as BN } from 'bignumber.js';
import { ParaShareToken, AddLiquidityRate } from '@augurproject/sdk-lite';
import {
  TradingDirection,
  AmmExchange,
  AmmExchanges,
  AmmMarketShares,
  AmmTransaction,
  Cashes,
  CurrencyBalance,
  PositionBalance,
  TransactionTypes,
  UserBalances,
  MarketInfos,
  LPTokens,
  EstimateTradeResult,
  Cash,
  AddLiquidityBreakdown,
  LiquidityBreakdown,
  AmmOutcome,
} from '../modules/types';
import ethers from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import {
  convertDisplayCashAmountToOnChainCashAmount,
  convertDisplayShareAmountToOnChainShareAmount,
  convertOnChainCashAmountToDisplayCashAmount,
  convertOnChainSharesToDisplayShareAmount,
  isSameAddress,
} from './format-number';
import { augurSdkLite } from './augurlitesdk';
import {
  ZERO,
  ETH,
  NO_OUTCOME_ID,
  NULL_ADDRESS,
  USDC,
  YES_NO_OUTCOMES_NAMES,
  YES_OUTCOME_ID,
  INVALID_OUTCOME_ID,
  MARKET_STATUS,
  getProviderOrSigner
} from '@augurproject/augur-comps';
import { createBigNumber } from './create-big-number';
import { PARA_CONFIG } from '../modules/stores/constants';
import Web3 from 'web3';

const isValidPrice = (price: string): boolean => {
  return (
    price !== null && price !== undefined && price !== '0' && price !== '0.00'
  );
};

const trimDecimalValue = (value: string | BigNumber) =>
  createBigNumber(value).toFixed(6);
interface LiquidityProperties {
  account: string;
  amm: AmmExchange;
  marketId: string;
  cash: Cash;
  fee: string;
  amount: string;
  priceNo: string;
  priceYes: string;
}

export const checkConvertLiquidityProperties = (
  account: string,
  marketId: string,
  amount: string,
  fee: string,
  outcomes: AmmOutcome[],
  cash: Cash,
  amm: AmmExchange
): LiquidityProperties => {
  if (
    !account ||
    !marketId ||
    !amount ||
    !outcomes ||
    outcomes.length === 0 ||
    !cash
  )
    return null;
  const priceNo = outcomes[NO_OUTCOME_ID]?.price;
  const priceYes = outcomes[YES_OUTCOME_ID]?.price;
  if (!isValidPrice(priceNo) || !isValidPrice(priceYes)) return null;
  if (amount === '0' || amount === '0.00') return null;
  if (Number(fee) < 0) return null;

  return {
    account,
    amm,
    marketId,
    cash,
    fee,
    amount,
    priceNo,
    priceYes,
  };
};

const convertPriceToPercent = (price: string) => {
  return String(new BN(price).times(100));
};

export async function estimateAddLiquidity(
  account: string,
  amm: AmmExchange,
  marketId: string,
  cash: Cash,
  fee: string,
  cashAmount: string,
  priceNo: string,
  priceYes: string
): Promise<AddLiquidityBreakdown> {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !augurClient.amm) {
    console.error('augurClient is null');
    return null;
  }

  const hasLiquidity =
    amm !== null && amm?.id !== undefined && amm?.liquidity !== '0';
  const sharetoken = cash?.shareToken;
  const ammAddress = amm?.id;
  const amount = convertDisplayCashAmountToOnChainCashAmount(
    cashAmount,
    cash.decimals
  );
  console.log(
    'getAddAmmLiquidity',
    account,
    'amm address',
    ammAddress,
    hasLiquidity,
    'marketId',
    marketId,
    'sharetoken',
    sharetoken,
    fee,
    String(amount),
    'No',
    String(priceNo),
    'Yes',
    String(priceYes)
  );

  // converting odds to pool percentage. odds is the opposit of pool percentage
  // same when converting pool percentage to price
  const poolYesPercent = new BN(convertPriceToPercent(priceNo));
  const poolNoPercent = new BN(convertPriceToPercent(priceYes));

  const liqNo = amm?.liquidityNo
    ? convertDisplayShareAmountToOnChainShareAmount(
        new BN(amm?.liquidityNo || '0'),
        new BN(amm?.cash?.decimals)
      )
    : new BN(0);
  const liqYes = amm?.liquidityYes
    ? convertDisplayShareAmountToOnChainShareAmount(
        new BN(amm?.liquidityYes || '0'),
        new BN(amm?.cash?.decimals)
      )
    : new BN(0);

  const addLiquidityResults: AddLiquidityRate = await augurClient.amm.getAddLiquidity(
    new BN(amm?.totalSupply || '0'),
    liqNo,
    liqYes,
    new BN(amount),
    poolYesPercent,
    poolNoPercent
  );

  if (addLiquidityResults) {
    const lpTokens = trimDecimalValue(
      convertOnChainSharesToDisplayShareAmount(
        String(addLiquidityResults.lpTokens),
        cash.decimals
      )
    );
    const noShares = trimDecimalValue(
      convertOnChainSharesToDisplayShareAmount(
        String(addLiquidityResults.short),
        cash.decimals
      )
    );
    const yesShares = trimDecimalValue(
      convertOnChainSharesToDisplayShareAmount(
        String(addLiquidityResults.long),
        cash.decimals
      )
    );

    return {
      lpTokens,
      yesShares,
      noShares,
    };
  }

  return null;
}

export function doAmmLiquidity(
  account: string,
  amm: AmmExchange,
  marketId: string,
  cash: Cash,
  fee: string,
  cashAmount: string,
  hasLiquidity: boolean,
  priceNo: string,
  priceYes: string
): Promise<TransactionResponse | null> {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !augurClient.amm) {
    console.error('augurClient is null');
    return null;
  }
  const sharetoken = cash?.shareToken;
  const ammAddress = amm?.id;
  const amount = convertDisplayCashAmountToOnChainCashAmount(
    cashAmount,
    cash.decimals
  );
  console.log(
    'doAmmLiquidity',
    account,
    ammAddress,
    hasLiquidity,
    marketId,
    sharetoken,
    fee,
    String(amount),
    'No',
    String(priceNo),
    'Yes',
    String(priceYes)
  );

  // converting odds to pool percentage. odds is the opposit of pool percentage
  // same when converting pool percentage to price
  const poolYesPercent = new BN(convertPriceToPercent(priceNo));
  const poolNoPercent = new BN(convertPriceToPercent(priceYes));

  return augurClient.amm.doAddLiquidity(
    account,
    ammAddress,
    hasLiquidity,
    marketId,
    sharetoken,
    new BN(fee),
    new BN(amount),
    poolYesPercent,
    poolNoPercent
  );
}

export const isAddress = (value) => {
  try {
    return ethers.utils.getAddress(value.toLowerCase());
  } catch {
    return false;
  }
};

export const getContract = (
  tokenAddress: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract => {
  if (!isAddress(tokenAddress) || tokenAddress === NULL_ADDRESS) {
    throw Error(`Invalid 'address' parameter '${tokenAddress}'.`);
  }
  return new Contract(
    tokenAddress,
    ABI,
    getProviderOrSigner(library, account) as any
  );
};

// returns null on errors
export const getErc20Contract = (
  tokenAddress: string,
  library: Web3Provider,
  account: string
): Contract | null => {
  if (!tokenAddress || !library) return null;
  try {
    return getContract(tokenAddress, ERC20ABI, library, account);
  } catch (error) {
    console.error('Failed to get contract', error);
    return null;
  }
};

export const getErc1155Contract = (
  tokenAddress: string,
  library: Web3Provider,
  account: string
): Contract | null => {
  if (!tokenAddress || !library) return null;
  try {
    return getContract(tokenAddress, ParaShareToken.ABI, library, account);
  } catch (error) {
    console.error('Failed to get contract', error);
    return null;
  }
};

// export const getERC20Allowance = async (tokenAddress: string, provider: Web3Provider, account: string, spender: string): Promise<string> => {
//   const multicall = new Multicall({ ethersProvider: provider });

//   const contractAllowanceCall: ContractCallContext[] = [{
//     reference: tokenAddress,
//     contractAddress: tokenAddress,
//     abi: ERC20ABI,
//     calls: [
//       {
//         reference: tokenAddress,
//         methodName: 'allowance',
//         methodParameters: [account, spender],
//       },
//     ],
//   }];

//   const allowance: ContractCallResults = await multicall.call(
//     contractAllowanceCall
//   );

//   let allowanceAmount = "0";
//   Object.keys(allowance.results).forEach((key) => {
//     const value = allowance.results[key].callsReturnContext[0].returnValues as ethers.utils.Result;
//     allowanceAmount = String(new BN(value.hex));
//   })

//   return allowanceAmount;
// }

// export const getERC1155ApprovedForAll = async (tokenAddress: string, provider: Web3Provider, account: string, spender: string): Promise<boolean> => {
//   const multicall = new Multicall({ ethersProvider: provider });

//   const contractAllowanceCall: ContractCallContext[] = [{
//     reference: tokenAddress,
//     contractAddress: tokenAddress,
//     abi: ParaShareToken.ABI,
//     calls: [
//       {
//         reference: tokenAddress,
//         methodName: 'isApprovedForAll',
//         methodParameters: [account, spender],
//       },
//     ],
//   }];
//   const isApprovedResult: ContractCallResults = await multicall.call(
//     contractAllowanceCall
//   );

//   let isApproved = false;
//   Object.keys(isApprovedResult.results).forEach((key) => {
//     const value = isApprovedResult.results[key].callsReturnContext[0].returnValues as ethers.utils.Result;
//     isApproved = Boolean(value)
//   })

//   return isApproved;
// }

const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
];
const kovanRepAddress = '0xdc3d8D4Ea1CE2ffB65070787C47faBECAD22897a';

export async function getRepBalance(
  provider: Web3Provider,
  address: string
): Promise<BigNumber> {
  if (!address) return ZERO;
  // kovan address
  const contract = getErc20Contract(kovanRepAddress, provider, address);
  if (contract) {
    let balance = await contract.balanceOf(address);
    const balVal = convertOnChainCashAmountToDisplayCashAmount(
      new BN(String(balance._hex)),
      18
    );
    return balVal;
  }
}

export async function getLegacyRepBalance(
  provider: Web3Provider,
  address: string
): Promise<BigNumber> {
  if (!address) return ZERO;
  const { addresses } = PARA_CONFIG;
  const legacyRep = addresses.LegacyReputationToken;
  const contract = getErc20Contract(legacyRep, provider, address);
  if (contract) {
    let balance = await contract.balanceOf(address);
    const balVal = convertOnChainCashAmountToDisplayCashAmount(
      new BN(String(balance._hex)),
      18
    );
    return balVal;
  }
}

export async function isRepV2Approved(provider, account): Promise<boolean> {
  //const { contracts } = augurSdk.get();
  const { addresses } = PARA_CONFIG;
  const legacyRep = addresses.LegacyReputationToken;
  const contract = getErc20Contract(legacyRep, provider, account);
  try {
    console.log(contract);
    const currentAllowance = await contract.allowance(
      account,
      kovanRepAddress
    );
    console.log(currentAllowance.lte(0));

    if (currentAllowance.lte(0)) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
}

export async function convertV1ToV2Approve() {

  const allowance = createBigNumber(99999999999999999999).times(
    TEN_TO_THE_EIGHTEENTH_POWER
  );
  let response = null;
  try {
    const getReputationToken = await contracts.universe.getReputationToken_();
    response = await contracts.legacyReputationToken.approve(getReputationToken, allowance);
  } catch (e) {
    console.error(e);
  }
  return response;
}

export async function convertV1ToV2() {
  // const { contracts } = augurSdk.get();
  // let response = false;
  // try {
  //   response = await contracts.reputationToken.migrateFromLegacyReputationToken();
  // } catch (e) {
  //   console.error(e);
  // }
  // return response;
}
