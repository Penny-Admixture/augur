import { BigNumber as BN } from 'bignumber.js'
import { RemoveLiquidityRate, numTicksToTickSizeWithDisplayPrices, convertDisplayAmountToOnChainAmount, ParaShareToken } from '@augurproject/sdk-lite'
import { TradeInfo, TradingDirection, AmmExchange, AmmExchanges, AmmMarketShares, Cashes, CurrencyBalance, PositionBalance, UserBalances } from 'modules/types';
import ethers from 'ethers';

import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from '@augurproject/ethereum-multicall';

import { Web3Provider } from '@ethersproject/providers'
import { convertOnChainToDisplayAmount, onChainMarketSharesToDisplayFormatter } from './format-number';
import { augurSdkLite } from './augurlitesdk';
import { ETH, NO_OUTCOME_ID, USDC, YES_OUTCOME_ID } from '../modules/constants';

// TODO: when scalars get num ticks from market
export const YES_NO_NUM_TICKS = 1000;

// TODO: pass in precision to converting helper
export const formatToOnChainShares = (num = '0', decimals = '18'): BN => {
  // TODO: get max min price from market when scalars markets
  const numTicks = numTicksToTickSizeWithDisplayPrices(
    new BN(YES_NO_NUM_TICKS),
    new BN(0),
    new BN(1)
  );
  const onChain = convertDisplayAmountToOnChainAmount(
    new BN(num),
    numTicks,
    new BN(decimals)
  );
  console.log(
    'to onChain shares value decimals:',
    num,
    decimals,
    String(onChain)
  );
  return onChain;
};

export interface AddAmmLiquidity {
  account: string;
  ammAddress: string;
  hasLiquidity: boolean;
  augurClient;
  marketId: string;
  sharetoken: string;
  fee: string;
  cashAmount: string;
  priceNo: number;
  priceYes: number;
  useEth: boolean;
}

export function addAmmLiquidity({
  account,
  ammAddress,
  hasLiquidity,
  marketId,
  sharetoken,
  fee,
  cashAmount,
  priceNo,
  priceYes,
  useEth,
}: AddAmmLiquidity) {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !augurClient.amm)
    return console.error('augurClient is null');
  console.log(
    'addAmmLiquidity',
    account,
    ammAddress,
    hasLiquidity,
    marketId,
    sharetoken,
    fee,
    String(cashAmount),
    'No',
    String(priceNo),
    'Yes',
    String(priceYes),
    `use ETH: ${useEth}`
  );

  // converting odds to pool percentage. odds is the opposit of pool percentage
  // same when converting pool percentage to price
  const poolYesPercent = new BN(priceNo);
  const poolNoPercent = new BN(priceYes);

  return augurClient.amm.doAddLiquidity(
    account,
    ammAddress,
    hasLiquidity,
    marketId,
    sharetoken,
    new BN(fee),
    new BN(cashAmount),
    poolYesPercent,
    poolNoPercent
  );
}

export interface GetRemoveLiquidity {
  marketId: string;
  paraShareToken: string;
  fee: string;
  lpTokenBalance: string;
}

export async function getRemoveLiquidity({
  marketId,
  paraShareToken,
  fee,
  lpTokenBalance,
}: GetRemoveLiquidity): Promise<{
  noShares: string;
  yesShares: string;
  cashShares: string;
} | null> {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !marketId || !paraShareToken || !fee) {
    console.error('getRemoveLiquidity: augurClient is null or no amm address');
    return null;
  }
  const alsoSell = true;
  const results: RemoveLiquidityRate = await augurClient.amm.getRemoveLiquidity(
    marketId,
    paraShareToken,
    new BN(String(fee)),
    new BN(String(lpTokenBalance)),
    alsoSell
  );
  return {
    noShares: results.short.toFixed(),
    yesShares: results.long.toFixed(),
    cashShares: results.cash.toFixed(),
  };
}

export function doRemoveAmmLiquidity({
  marketId,
  paraShareToken,
  fee,
  lpTokenBalance,
}: GetRemoveLiquidity) {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !marketId || !paraShareToken || !fee)
    return console.error(
      'removeAmmLiquidity: augurClient is null or no amm address'
    );
  const alsoSell = true;
  return augurClient.amm.doRemoveLiquidity(
    marketId,
    paraShareToken,
    new BN(fee),
    new BN(lpTokenBalance),
    alsoSell
  );
}

export async function estimateTrade(
  trade: TradeInfo,
  includeFee: boolean = true,
  useEth: boolean = false
) {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !trade.amm.id)
    return console.error('estimateTrade: augurClient is null or amm address');
  const tradeDirection = trade.tradeType;

  let outputYesShares = trade.buyYesShares;
  let breakdown = null;

  if (tradeDirection === TradingDirection.ENTRY) {
    const cash = new BN(String(trade.inputAmount.raw));
    console.log(
      tradeDirection,
      'marketId',
      trade.marketId,
      'shareToken',
      trade.amm.sharetoken,
      'fee',
      trade.amm.fee,
      'cash',
      String(cash),
      'output yes:',
      outputYesShares,
      'includeFee:',
      includeFee
    );
    breakdown = await augurClient.amm.getEnterPosition(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      cash,
      outputYesShares,
      includeFee
    );
    console.log('breakdown', JSON.stringify(breakdown));
    return String(breakdown);
  }
  if (tradeDirection === TradingDirection.EXIT) {
    let longShares = new BN('0');
    let shortShares = new BN('0');
    let invalidShares = new BN(trade.balance.outcomes[0]);
    if (!outputYesShares) {
      shortShares = new BN(String(trade.inputAmount.raw));
      shortShares = BN.minimum(invalidShares, shortShares);
    } else {
      longShares = new BN(String(trade.inputAmount.raw));
    }

    console.log(
      tradeDirection,
      'no:',
      String(shortShares),
      'yes:',
      String(longShares)
    );
    breakdown = await augurClient.amm.getExitPosition(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      invalidShares, // TODO: is this needed or a merge issue from para_deploys
      shortShares,
      longShares,
      includeFee
    );
    return String(breakdown['cash']);
  }
  if (tradeDirection === TradingDirection.SWAP) {
    const inputAmmount = new BN(String(trade.inputAmount.raw));
    console.log(tradeDirection, String(inputAmmount), outputYesShares);
    breakdown = await augurClient.amm.getSwap(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      inputAmmount,
      !outputYesShares,
      includeFee
    );
    console.log('get swap rate', String(breakdown));
    return String(breakdown);
  }
  return null;
}

export async function doTrade(
  trade: TradeInfo,
  minAmount: string,
  useEth: boolean = false
) {
  const augurClient = augurSdkLite.get();
  if (!augurClient || !trade.amm.id)
    return console.error('doTrade: augurClient is null or amm address');
  const tradeDirection = trade.tradeType;
  const outputYesShares = trade.buyYesShares;

  if (tradeDirection === TradingDirection.ENTRY) {
    console.log(
      'doEnterPosition:',
      trade.marketId,
      trade.amm.sharetoken,
      trade.amm.fee,
      String(trade.inputAmount.raw),
      outputYesShares,
      String(minAmount)
    );

    return augurClient.amm.doEnterPosition(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      new BN(String(trade.inputAmount.raw)),
      outputYesShares,
      new BN(String(minAmount))
    );
  }

  if (tradeDirection === TradingDirection.EXIT) {
    let longShares = new BN('0');
    let shortShares = new BN('0');
    let invalidShares = new BN(trade.balance.outcomes[0]);
    if (!outputYesShares) {
      shortShares = new BN(String(trade.inputAmount.raw));
      shortShares = BN.minimum(invalidShares, shortShares);
    } else {
      longShares = new BN(String(trade.inputAmount.raw));
    }

    console.log(
      'doExitPosition:',
      trade.marketId,
      trade.amm.sharetoken,
      trade.amm.fee,
      String(shortShares),
      String(longShares),
      String(minAmount)
    );

    return augurClient.amm.doExitPosition(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      invalidShares, // TODO, is this needed or merge issue with para_deploys
      shortShares,
      longShares,
      new BN(String(minAmount))
    );
  }

  if (tradeDirection === TradingDirection.SWAP) {
    console.log(
      'doSwap:',
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      new BN(String(trade.inputAmount.raw)),
      outputYesShares,
      new BN(minAmount)
    );
    return augurClient.amm.doSwap(
      trade.marketId,
      trade.amm.sharetoken,
      new BN(trade.amm.fee),
      new BN(String(trade.inputAmount.raw)),
      outputYesShares,
      new BN(minAmount)
    );
  }
  return null;
}

export const getUserBalances = async (
  provider: Web3Provider,
  account: string,
  ammExchanges: AmmExchanges,
  cashes: Cashes
): Promise<UserBalances> => {
  const userBalances = {
    ETH: {
      balance: '0',
      rawBalance: '0',
      usdValue: '0',
    },
    USDC: {
      balance: '0',
      rawBalance: '0',
      usdValue: '0',
    },
    totalPositionUsd: "0",
    total24hrPositionUsd: "0",
    change24hrPositionUsd: "0",
    lpTokens: {},
    marketShares: {},
  };

  if (!account || !provider) return userBalances;

  const BALANCE_OF = 'balanceOf';
  const MARKET_SHARE_BALANCE = 'balanceOfMarketOutcome';

  // TODO: use amm factory abi when that's available in sdk-lite
  //const lpAbi = AMMFactoryAbi;
  const lpAbi = ERC20ABI;

  // balance of
  const ammAddresses: string[] = Object.keys(ammExchanges);
  const exchanges = Object.values(ammExchanges);
  // share tokens
  const shareTokens: string[] = Object.keys(cashes).map(
    (id) => cashes[id].shareToken
  );
  // markets
  const marketIds: string[] = ammAddresses.reduce(
    (p, a) =>
      p.includes(ammExchanges[a].marketId)
        ? p
        : [...p, ammExchanges[a].marketId],
    []
  );

  userBalances.ETH = await getEthBalance(provider, cashes, account);

  const multicall = new Multicall({ ethersProvider: provider });

  const contractLpBalanceCall: ContractCallContext[] = ammAddresses.map(
    (address) => ({
      reference: address,
      contractAddress: address,
      abi: lpAbi,
      calls: [
        {
          reference: address,
          methodName: BALANCE_OF,
          methodParameters: [account],
        },
      ],
    })
  );

  const contractMarketShareBalanceCall: ContractCallContext[] = marketIds.reduce(
    (p, marketId) => {
      const shareTokenOutcomeShareBalances = shareTokens.reduce(
        (k, shareToken) => {
          // TODO: might need to change when scalars come in
          const outcomeShareBalances = [0, 1, 2].map((outcome) => ({
            reference: `${marketId}-${outcome}`,
            contractAddress: shareToken,
            abi: ParaShareToken.ABI,
            calls: [
              {
                reference: `${marketId}-${outcome}`,
                methodName: MARKET_SHARE_BALANCE,
                methodParameters: [marketId, outcome, account],
              },
            ],
          }));
          return [...k, ...outcomeShareBalances];
        },
        []
      );
      return [...p, ...shareTokenOutcomeShareBalances];
    },
    []
  );

  let basicBalanceCalls: ContractCallContext[] = [];
  const usdc = Object.values(cashes).find((c) => c.name === USDC);
  if (usdc) {
    basicBalanceCalls = [
      {
        reference: 'usdc-balance',
        contractAddress: usdc.address,
        abi: ERC20ABI,
        calls: [{ reference: 'usdcBalance', methodName: BALANCE_OF, methodParameters: [account] }]
      }
    ]
  }

  const balananceCalls = [
    ...contractLpBalanceCall,
    ...contractMarketShareBalanceCall,
    ...basicBalanceCalls,
  ];

  let balances: string[] = [];
  const balanceResult: ContractCallResults = await multicall.call(
    balananceCalls
  );

  Object.keys(balanceResult.results).forEach((key) => {
    const value = String(
      new BN(
        JSON.parse(
          JSON.stringify(
            balanceResult.results[key].callsReturnContext[0].returnValues
          )
        ).hex
      )
    );
    balances.push(value);

    const method = String(
      balanceResult.results[key].originalContractCallContext.calls[0].methodName
    );
    const contractAddress = String(
      balanceResult.results[key].originalContractCallContext.contractAddress
    );
    const params = String(
      balanceResult.results[key].originalContractCallContext.calls[0]
        .methodParameters
    );
    const balanceValue = balanceResult.results[key].callsReturnContext[0]
      .returnValues as ethers.utils.Result;
    const rawBalance = String(new BN(balanceValue.hex));

    if (method === BALANCE_OF) {
      if (usdc && contractAddress === usdc.address) {
        const usdcValue = convertOnChainToDisplayAmount(
          new BN(rawBalance),
          new BN(usdc.decimals)
        );
        userBalances.USDC = {
          balance: String(usdcValue),
          rawBalance: rawBalance,
          usdValue: String(usdcValue),
        };
      } else {
        const cash = cashes[ammExchanges[contractAddress]?.cash.address];
        const balance = onChainMarketSharesToDisplayFormatter(
          rawBalance,
          cash.decimals
        );
        if (balance !== '0') {
          userBalances.lpTokens[contractAddress] = { balance, rawBalance };
        }
      }
    } else if (method === MARKET_SHARE_BALANCE) {
      const cash = Object.values(cashes).find(
        (c) => c.shareToken.toLowerCase() === contractAddress.toLowerCase()
      );
      const balance = onChainMarketSharesToDisplayFormatter(
        rawBalance,
        cash.decimals
      );

      const [marketId, outcome] = params.split(',');
      const amm = exchanges.find(
        (e) =>
          e.sharetoken.toLowerCase() === contractAddress.toLowerCase() &&
          e.marketId === marketId
      );

      if (amm) {
        const existingAmm = userBalances.marketShares[amm.id];
        if (existingAmm) {
          existingAmm[outcome] = getPositionUsdValues(rawBalance, balance, outcome, amm);
        } else if (balance !== "0") {
          userBalances.marketShares[amm.id] = {}
          userBalances.marketShares[amm.id][outcome] = getPositionUsdValues(rawBalance, balance, outcome, amm);
        }
      }
    }
  })

  return { ...userBalances, ...getTotalPositions(userBalances.marketShares) }
}

const getTotalPositions = (ammMarketShares: AmmMarketShares): { change24hrPositionUsd: string, totalPositionUsd: string, total24hrPositionUsd: string } => {
  const result = Object.keys(ammMarketShares).reduce((p, ammId) => {
    const outcomes = ammMarketShares[ammId];
    Object.keys(outcomes).forEach(id => {
      const balances = outcomes[id];
      p.total = p.total.plus(new BN(balances.usdValue))
      if (balances.past24hrUsdValue) {
        p.total24 = p.total24.plus(new BN(balances.past24hrUsdValue))
      }
    })
    return p;
  }, { total: new BN("0"), total24: new BN("0") })

  const change24hrPositionUsd = String(result.total.minus(result.total24));
  return { change24hrPositionUsd, total24hrPositionUsd: String(result.total24), totalPositionUsd: String(result.total) }
}

const getPositionUsdValues = (rawBalance: string, balance: string, outcome: string, amm: AmmExchange): PositionBalance => {
  const { priceNo, priceYes, past24hrPriceNo, past24hrPriceYes } = amm;
  let usdValue = "0";
  let past24hrUsdValue = null;
  let change24hrPositionUsd = null;
  if (outcome === String(NO_OUTCOME_ID)) {
    usdValue = String(new BN(balance).times(new BN(priceNo)));
    past24hrUsdValue = past24hrPriceNo ? String(new BN(balance).times(new BN(past24hrPriceNo))) : null;
    change24hrPositionUsd = past24hrPriceNo ? String(new BN(usdValue).times(new BN(past24hrUsdValue))) : null;
  } else if (outcome === String(YES_OUTCOME_ID)) {
    usdValue = String(new BN(balance).times(new BN(priceYes)));
    past24hrUsdValue = past24hrPriceYes ? String(new BN(balance).times(new BN(past24hrPriceYes))) : null;
    change24hrPositionUsd = past24hrPriceYes ? String(new BN(usdValue).times(new BN(past24hrUsdValue))) : null;
  }

  return {
    balance,
    rawBalance,
    usdValue,
    past24hrUsdValue,
    change24hrPositionUsd
  }
}

const getEthBalance = async (provider: Web3Provider, cashes: Cashes, account: string): Promise<CurrencyBalance> => {
  const ethCash = Object.values(cashes).find(c => c.name === ETH);
  const ethbalance = await provider.getBalance(account);
  const ethValue = convertOnChainToDisplayAmount(
    new BN(String(ethbalance)),
    18
  );

  return {
    balance: String(ethValue),
    rawBalance: String(ethbalance),
    usdValue: ethCash
      ? String(ethValue.times(new BN(ethCash.usdPrice)))
      : String(ethValue),
  };
};

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