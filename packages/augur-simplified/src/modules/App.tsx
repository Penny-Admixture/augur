import React, { useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client, getMarketsData } from './apollo/client';
import { HashRouter } from 'react-router-dom';
import Styles from './App.styles.less';
import Routes from './routes/routes';
import TopNav from './common/top-nav';
import '../assets/styles/shared.less';
import { AppStatusProvider, useAppStatusStore } from './stores/app-status';
import { Sidebar } from './sidebar/sidebar';
import { processGraphMarkets } from '../utils/process-data';
import { getUserBalances } from '../utils/contract-calls';
import { augurSdkLite } from '../utils/augurlitesdk';
import { ConnectAccountProvider } from './ConnectAccount/connect-account-provider';
import classNames from 'classnames';
import { TransactionDetails } from './types';
import ModalView from './modal/modal-view';

function checkIsMobile(setIsMobile) {
  const isMobile =
    (
      window.getComputedStyle(document.body).getPropertyValue('--is-mobile') ||
      ''
    ).indexOf('true') !== -1;
  setIsMobile(isMobile);
}

const AppBody = () => {
  const {
    loginAccount,
    sidebarType,
    showTradingForm,
    processed,
    paraConfig,
    isMobile,
    blocknumber,
    transactions,
    modal,
    actions: {
      setIsMobile,
      updateGraphHeartbeat,
      updateUserBalances,
      finalizeTransaction,
    },
  } = useAppStatusStore();
  const modalShowing = Object.keys(modal).length !== 0;

  useEffect(() => {
    let isMounted = true;
    // get data immediately, then setup interval
    getMarketsData(paraConfig, (graphData, block) => {
      isMounted &&
        updateGraphHeartbeat(processGraphMarkets(graphData), graphData, block);
    });
    const intervalId = setInterval(() => {
      getMarketsData(paraConfig, (graphData, block) => {
        isMounted &&
          updateGraphHeartbeat(
            processGraphMarkets(graphData),
            graphData,
            block
          );
      });
    }, 15000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function handleRezize() {
      checkIsMobile(setIsMobile);
    }
    window.addEventListener('resize', handleRezize);
    checkIsMobile(setIsMobile);
    return () => {
      window.removeEventListener('resize', handleRezize);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showTradingForm) {
      window.scrollTo(0, 0);
    }
    if (showTradingForm || modalShowing) {
      document.body.classList.add('App--noScroll');
    } else {
      document.body.classList.remove('App--noScroll');
    }
  }, [showTradingForm, modalShowing]);

  useEffect(() => {
    const createClient = (provider, config, account) =>
      augurSdkLite.makeLiteClient(provider, config, account);
    const fetchUserBalances = (
      library,
      account,
      ammExchanges,
      cashes,
      markets
    ) => getUserBalances(library, account, ammExchanges, cashes, markets);
    if (loginAccount?.library && loginAccount?.account) {
      if (!augurSdkLite.ready())
        createClient(loginAccount.library, paraConfig, loginAccount?.account);
      const { ammExchanges, cashes, markets } = processed;
      fetchUserBalances(
        loginAccount.library,
        loginAccount.account,
        ammExchanges,
        cashes,
        markets
      ).then((userBalances) => updateUserBalances(userBalances));
    }
    // eslint-disable-next-line
  }, [loginAccount, processed, paraConfig]);

  useEffect(() => {
    if (loginAccount?.account && blocknumber && transactions?.length > 0) {
      transactions
        .filter((t) => !t.confirmedTime)
        .forEach((t: TransactionDetails) => {
          loginAccount.library.getTransactionReceipt(t.hash).then((receipt) => {
            if (receipt) finalizeTransaction(t.hash);
          });
        });
    }
    // eslint-disable-next-line
  }, [loginAccount, blocknumber, transactions]);

  const sidebarOut = sidebarType && isMobile;
  return (
    <div
      id="mainContent"
      className={classNames(Styles.App, {
        [Styles.SidebarOut]: sidebarOut,
      })}
    >
      {modalShowing && <ModalView />}
      {sidebarOut && <Sidebar />}
      <TopNav />
      <Routes />
    </div>
  );
};

function App() {
  return (
    <HashRouter hashType="hashbang">
      <AppStatusProvider>
        <ConnectAccountProvider>
          <ApolloProvider client={client}>
            <AppBody />
          </ApolloProvider>
        </ConnectAccountProvider>
      </AppStatusProvider>
    </HashRouter>
  );
}

export default App;
