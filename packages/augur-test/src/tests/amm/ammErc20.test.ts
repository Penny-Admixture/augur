import BigNumber from 'bignumber.js';

import {TestContractAPI, ACCOUNTS, defaultSeedPath, loadSeed, makeSigner} from '@augurproject/tools';
import {
  convertDisplayAmountToOnChainAmount,
  convertDisplayPriceToOnChainPrice,
  convertOnChainAmountToDisplayAmount,
  convertOnChainPriceToDisplayPrice,
  numTicksToTickSize,
  numTicksToTickSizeWithDisplayPrices,
  SDKConfiguration,
} from '@augurproject/utils';

import {AMM} from '@augurproject/sdk-lite';
import {makeProvider} from '../../libs';
import {ContractInterfaces} from '@augurproject/core';


describe('AMM Middleware for ERC20', () => {
  let john: TestContractAPI;
  let mary: TestContractAPI;
  let bob: TestContractAPI;
  let config: SDKConfiguration;
  let usdtParaShare: ContractInterfaces.ParaShareToken;

  let market: ContractInterfaces.Market;
  let INVALID: BigNumber;
  let NO: BigNumber;
  let YES: BigNumber;

  const INCLUDE_FEE = true;
  const EXCLUDE_FEE = false;
  const ALSO_SELL = true;
  const DONT_SELL = false;

  function makeAMMMiddleware(user: TestContractAPI): AMM {
    const wethParaShareTokenAddress = config?.paraDeploys[config.addresses.WETH9]?.addresses.ShareToken;
    return new AMM(user.signer, wethParaShareTokenAddress, config.addresses.AMMFactory, config.addresses.WETH9);
  }

  function makeUSDTParaShareToken(user: TestContractAPI): ContractInterfaces.ParaShareToken {
    const usdtParaShareAddress = config.paraDeploys[config.addresses.USDT].addresses.ShareToken;
    return new ContractInterfaces.ParaShareToken(user.dependencies, usdtParaShareAddress);
  }

  function bn(n: string | number | BigNumber): BigNumber {
    return new BigNumber(n);
  }

  beforeAll(async () => {
    const seed = await loadSeed(defaultSeedPath, 'paras');
    const provider = await makeProvider(seed, ACCOUNTS);
    config = provider.getConfig();

    john = await TestContractAPI.userWrapper(
      ACCOUNTS[0],
      provider,
      config
    );
    mary = await TestContractAPI.userWrapper(
      ACCOUNTS[1],
      provider,
      config
    );
    bob = await TestContractAPI.userWrapper(
      ACCOUNTS[2],
      provider,
      config
    );

    usdtParaShare = makeUSDTParaShareToken(bob);

    market = await john.createReasonableYesNoMarket();
    INVALID = await usdtParaShare.getTokenId_(market.address, bn(0));
    NO = await usdtParaShare.getTokenId_(market.address, bn(1));
    YES = await usdtParaShare.getTokenId_(market.address, bn(2));
  });

  describe('with a simple liquid AMM', () => {
    const fee = bn(10); // 1%
    const initialLiquidity = bn(1000).times(1e6); // 1000 USDT

    beforeAll(async () => {
      const longPercent = bn(50);
      const shortPercent = bn(100).minus(longPercent);

      await mary.faucetUSDT(initialLiquidity);
      await mary.approveUSDT(config.addresses.AMMFactory);

      const middleware = makeAMMMiddleware(mary);

      console.log('Create AMM with initial liquidity');
      await middleware.doAddLiquidity(
        mary.account.address,
        undefined,
        false,
        market.address,
        usdtParaShare.address,
        fee,
        initialLiquidity,
        longPercent,
        shortPercent,
      );
    });

    test('liquidity minted lp tokens', async () => {
      const middleware = makeAMMMiddleware(mary);
      console.log('Verify the LP token supply');
      const expectedLPTokens = initialLiquidity.idiv(await market.getNumTicks_());
      const actualLPTokens = await middleware.supplyOfLiquidityTokens(market.address, usdtParaShare.address, fee);
      expect(actualLPTokens).toEqual(expectedLPTokens);

      console.log('Verify that the LP tokens are held by Mary');
      const actuallyHeldLPTokens = await middleware.liquidityTokenBalance(market.address, usdtParaShare.address, fee, mary.account.address);
      expect(actuallyHeldLPTokens).toEqual(expectedLPTokens); // mary has all of the LP tokens
    })

    test('enter position', async () => {
      const middleware = makeAMMMiddleware(bob);
      const cash = bn(10).times(1e6); // 10 USDT
      const buyLong = true;

      await bob.faucetUSDT(cash);
      await bob.approveUSDT(config.addresses.AMMFactory);

      console.log('Estimating position being entered');
      const withFee = await middleware.getEnterPosition(market.address, usdtParaShare.address, fee, cash, buyLong, INCLUDE_FEE);
      const withoutFee = await middleware.getEnterPosition(market.address, usdtParaShare.address, fee, cash, buyLong, EXCLUDE_FEE);

      console.log('Verifying that no-fee estimation is correct relative to fee estimation.');
      expect(withFee.toNumber()).toEqual(withoutFee.times(0.99).toNumber());

      console.log('Verifying that the entry estimation is correct, to a hardcoded value')
      expect(withoutFee.toNumber()).toEqual(19900);

      console.log('Entering position');
      await middleware.doEnterPosition(market.address, usdtParaShare.address, fee, cash, buyLong, withFee);

      const invalid = await usdtParaShare.balanceOf_(bob.account.address, INVALID);
      const no = await usdtParaShare.balanceOf_(bob.account.address, NO);
      const yes = await usdtParaShare.balanceOf_(bob.account.address, YES);

      console.log('Verifying entered position');
      expect(invalid.toNumber()).toEqual(no.toNumber());
      expect(invalid.toNumber()).toEqual(0);
      expect(yes.toNumber()).toEqual(withFee.toNumber());
    });

    test('exit position', async () => {
      const middleware = makeAMMMiddleware(bob);

      const longShares = await usdtParaShare.balanceOf_(bob.account.address, YES); // from enter position test

      console.log('Estimating exit position rate');
      const sharesToExit = longShares.idiv(4);
      const withFee = await middleware.getExitPosition(market.address, usdtParaShare.address, fee, bn(0), sharesToExit, INCLUDE_FEE)
      const withoutFee = await middleware.getExitPosition(market.address, usdtParaShare.address, fee, bn(0), sharesToExit, EXCLUDE_FEE)

      console.log('Verifying that no-fee estimation is correct relative to fee estimation.');
      expect(withFee.toNumber()).toEqual(withoutFee.times(0.99).toNumber());

      console.log('Approving AMM Factory to use USDT ParaShareTokens for Bob');
      expect(await bob.balanceOfUSDT().then(bn => bn.toNumber())).toEqual(0); // make sure cash is empty else the test gets nonsensical later

      await usdtParaShare.setApprovalForAll(config.addresses.AMMFactory, true); // note that Bob is the actor here

      console.log('Exiting 1/4th of position');
      await middleware.doExitPosition(market.address, usdtParaShare.address, fee, bn(0), sharesToExit, withFee);

      const invalid = await usdtParaShare.balanceOf_(bob.account.address, INVALID);
      const no = await usdtParaShare.balanceOf_(bob.account.address, NO);
      const yes = await usdtParaShare.balanceOf_(bob.account.address, YES);
      const cash = await bob.balanceOfUSDT();

      console.log('Verifying exited position');
      expect(cash.toNumber()).toEqual(withFee.toNumber());
      expect(invalid.toNumber()).toEqual(no.toNumber());
      expect(invalid.toNumber()).toEqual(0);
      expect(yes.toNumber()).toEqual(longShares.minus(sharesToExit).toNumber());
    });

    test('swap', async () => {
      const middleware = makeAMMMiddleware(bob);
      const BUY_SHORT = false;
      const longShares = await usdtParaShare.balanceOf_(bob.account.address, YES);
      const swapAway = longShares.idiv(2);

      console.log('Estimating swap of half Long shares for Short shares');
      const withFee = await middleware.getSwap(market.address, usdtParaShare.address, fee, swapAway, BUY_SHORT, INCLUDE_FEE);
      const withoutFee = await middleware.getSwap(market.address, usdtParaShare.address, fee, swapAway, BUY_SHORT, EXCLUDE_FEE);

      console.log('Verifying that no-fee estimation is correct relative to fee estimation.');
      expect(withFee.toNumber()).toEqual(withoutFee.times(bn(1000).minus(fee)).idiv(bn(1000)).toNumber());

      // Note: no need to approve the AMMFactory for the ParaShareToken because that happened in the test for exit position

      console.log('Swapping Long for Short');
      await middleware.doSwap(market.address, usdtParaShare.address, fee, swapAway, BUY_SHORT, withFee);

      const invalid = await usdtParaShare.balanceOf_(bob.account.address, INVALID);
      const no = await usdtParaShare.balanceOf_(bob.account.address, NO);
      const yes = await usdtParaShare.balanceOf_(bob.account.address, YES);

      console.log('Verifying swapped positions');
      expect(invalid.toNumber()).toEqual(no.toNumber());
      expect(invalid.toNumber()).toEqual(withFee.toNumber());
      expect(yes.toNumber()).toEqual(longShares.minus(swapAway).toNumber());
    });

    test('remove liquidity then sell shares', async () => {
      const middleware = makeAMMMiddleware(mary);

      const lpTokens = await middleware.liquidityTokenBalance(market.address, usdtParaShare.address, fee, mary.account.address);
      const lpTokensToBurn = lpTokens.idiv(3);

      console.log('Estimating removeLiquidity gains, with and without swapping shares for complete sets then burning them');
      const alsoSell = await middleware.getRemoveLiquidity(market.address, usdtParaShare.address, fee, lpTokensToBurn, ALSO_SELL);
      const dontSell = await middleware.getRemoveLiquidity(market.address, usdtParaShare.address, fee, lpTokensToBurn, DONT_SELL);

      expect(alsoSell).toEqual({
        short: bn(7),
        long: bn(0),
        cash: bn(330044793),
        sets: bn(330870)
      });
      expect(dontSell).toEqual({
        short: bn(330877),
        long: bn(330870),
        cash: bn(2513610),
        sets: bn(0)
      });

      console.log('Selling 1/3rd of LP tokens via removeLiquidity, then selling the resulting shares');
      await middleware.doRemoveLiquidity(market.address, usdtParaShare.address, fee, lpTokensToBurn, ALSO_SELL);

      const postInvalid = await usdtParaShare.balanceOf_(mary.account.address, INVALID);
      const postNo = await usdtParaShare.balanceOf_(mary.account.address, NO);
      const postYes = await usdtParaShare.balanceOf_(mary.account.address, YES);
      const postCash = await mary.balanceOfUSDT();

      expect(postInvalid.toNumber()).toEqual(alsoSell.short.toNumber());
      expect(postNo.toNumber()).toEqual(alsoSell.short.toNumber());
      expect(postYes.toNumber()).toEqual(alsoSell.long.toNumber());
      expect(postCash.toNumber()).toEqual(alsoSell.cash.toNumber());
    });

    test('remove all liquidity without selling shares', async () => {
      const middleware = makeAMMMiddleware(mary);

      const lpTokens = await middleware.liquidityTokenBalance(market.address, usdtParaShare.address, fee, mary.account.address);

      const priorInvalid = await usdtParaShare.balanceOf_(mary.account.address, INVALID);
      const priorNo = await usdtParaShare.balanceOf_(mary.account.address, NO);
      const priorYes = await usdtParaShare.balanceOf_(mary.account.address, YES);
      const priorCash = await mary.balanceOfUSDT();

      const ammAddress = await middleware.exchangeAddress(market.address, usdtParaShare.address, fee);
      const ammInvalid = await usdtParaShare.balanceOf_(ammAddress, INVALID);
      const ammNo = await usdtParaShare.balanceOf_(ammAddress, NO);
      const ammYes = await usdtParaShare.balanceOf_(ammAddress, YES);
      const ammCash = await mary.balanceOfUSDT(ammAddress);

      console.log('Estimating removeLiquidity gains, with swapping shares for complete sets then burning them');
      const estimate = await middleware.getRemoveLiquidity(market.address, usdtParaShare.address, fee, lpTokens, DONT_SELL);

      expect(estimate).toEqual({
        short: ammNo,
        long: ammYes,
        cash: ammCash,
        sets: bn(0)
      });

      console.log('Removing remaining liquidity without selling any received shares')
      // NOTE: Can't sell shares because this is the last of the AMM's liquidity. There'll be nothing left to swap away for complete sets.
      //       The final liquidity provider will need to sell complete sets themselves.
      await middleware.doRemoveLiquidity(market.address, usdtParaShare.address, fee, lpTokens, DONT_SELL);

      const postInvalid = await usdtParaShare.balanceOf_(mary.account.address, INVALID);
      const postNo = await usdtParaShare.balanceOf_(mary.account.address, NO);
      const postYes = await usdtParaShare.balanceOf_(mary.account.address, YES);
      const postCash = await mary.balanceOfUSDT();

      expect(postInvalid.toNumber()).toEqual(priorInvalid.plus(ammInvalid).toNumber());
      expect(postNo.toNumber()).toEqual(priorNo.plus(ammNo).toNumber());
      expect(postYes.toNumber()).toEqual(priorYes.plus(ammYes).toNumber());
      expect(postCash.toNumber()).toEqual(priorCash.plus(ammCash).toNumber());
    });
  });
});
