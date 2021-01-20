import React, {ReactNode} from 'react';

import Styles from './modal.styles.less';
import { CloseIcon } from '../common/icons';
import { useAppStatusStore } from '../stores/app-status';

export const Header = ({ title, subtitle }) => {
  const {
    actions: { closeModal },
  } = useAppStatusStore();

  return (
    <div className={Styles.Header}>
      <span>{title}</span>
      {subtitle?.value && (
        <div>
          <span>{subtitle.label}</span>
          <span>{subtitle.value}</span>
        </div>
      )}
      <button onClick={() => closeModal()}>{CloseIcon}</button>
    </div>
  );
};

interface ModalStructureProps {
  header?: ReactNode;
  main?: ReactNode;
  footer?: ReactNode;
}

export const ModalStructure = ({header, main, footer}: ModalStructureProps) => {
  return (
    <div className={Styles.ModalStructure}>
      {header && (
        <header>
          {header}
        </header>
      )}
      {main && (
        <main>
          {main}
        </main>
      )}
      {footer && (
        <footer>
          {footer}
        </footer>
      )}
    </div>
  )
}
