import React, { ReactElement, useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Activity as NetworkIcon } from 'react-feather';
import { ethers } from 'ethers';
import { SecondaryButton } from '../common/buttons';
import classNames from 'classnames';
import ButtonStyles from '../common/buttons.styles.less';
import { GetWalletIcon } from '../common/get-wallet-icon';
import { useActiveWeb3React } from './hooks';
import { MODAL_CONNECT_WALLET, TX_STATUS } from '../../utils/constants';
// import { useAppStatusStore } from '../stores/app-status';
import { tryAutoLogin } from './utils';
import { Spinner } from '../common/spinner';

interface LoginButtonProps {
  action: Function;
  text: string;
  icon: ReactElement;
  darkMode: boolean;
  className: string;
}

const LoginButton = ({
  action,
  text,
  icon,
  darkMode,
  className,
}: LoginButtonProps) => (
  <SecondaryButton
    action={action}
    text={text}
    icon={icon}
    className={classNames(
      {
        'dark-mode': darkMode,
      },
      className
    )}
  />
);

const shortenAddress = (address: string, chars = 4): string => {
  const isAddress = (value) => {
    try {
      return ethers.utils.getAddress(value.toLowerCase());
    } catch {
      return false;
    }
  };
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};

const ConnectAccountButton = ({
  autoLogin,
  updateLoginAccount,
  darkMode = false,
  transactions,
}) => {
  // const {
  //   isMobile,
  //   actions: { setModal },
  // } = useAppStatusStore();
  const isMobile = false;
  const setModal = (args) => {
    console.log('set modal');
  };

  const { account, activate, connector, error } = useWeb3React();
  const activeWeb3 = useActiveWeb3React();
  const pendingTransaction = transactions.filter(
    (tx) => tx.status === TX_STATUS.PENDING
  );
  const hasPendingTransaction = pendingTransaction.length > 0 || false;

  useEffect(() => {
    if (autoLogin && !account) tryAutoLogin(activate);
  }, [autoLogin, account, activate]);

  useEffect(() => {
    if (account) {
      updateLoginAccount(activeWeb3);
    }
  }, [account, activeWeb3]);

  let buttonProps = {
    action: () =>
      setModal({
        type: MODAL_CONNECT_WALLET,
        darkMode,
        autoLogin,
        transactions,
      }),
    className: null,
    darkMode,
    icon: null,
    text: 'Connect Wallet',
  };

  if (account) {
    buttonProps = {
      ...buttonProps,
      className: hasPendingTransaction ? ButtonStyles.Pending : null,
      text: hasPendingTransaction
        ? `${pendingTransaction.length || 0} Pending`
        : isMobile
        ? shortenAddress(account, 3)
        : shortenAddress(account),
      icon: hasPendingTransaction ? (
        <Spinner />
      ) : (
        connector && <GetWalletIcon connector={connector} account={account} />
      ),
    };
  } else if (error) {
    buttonProps = {
      ...buttonProps,
      className: ButtonStyles.Error,
      text:
        error instanceof UnsupportedChainIdError
          ? 'Unsupported Network'
          : 'Error',
      icon: <NetworkIcon />,
    };
  }

  return <LoginButton {...buttonProps} />;
};

export const ConnectAccount = ({
  autoLogin,
  updateLoginAccount,
  darkMode = false,
  transactions,
}) => {
  // useEffect(() => {
  //   console.log('hi');
  // })
  return (
    <button>connect</button>
    // <ConnectAccountButton
    //   autoLogin={autoLogin}
    //   updateLoginAccount={updateLoginAccount}
    //   darkMode={darkMode}
    //   transactions={transactions}
    // />
  );
};

