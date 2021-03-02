
import addCommasToNumber from './utils/add-commas-to-number';
import { isMobileBrowser, isMobileBrowserTall } from './utils/common-functions';
import * as _Constants from './utils/constants';
import { createBigNumber } from './utils/create-big-number';
import * as DateUtils from './utils/date-utils';
import * as Formatter from './utils/format-number';
import getPrecision from './utils/get-number-precision';
import logError from './utils/log-error';
import * as _Types from './utils/types';
import { windowRef } from './utils/window-ref';
import * as _Icons from './components/common/icons';
import * as _MarketCard from './components/market-card/market-card';
import _Logo from './components/common/logo';
import * as _Labels from './components/common/labels';
import * as _Buttons from './components/common/buttons';
import { ConnectAccountProvider as _ConnectAccountProvider } from './components/ConnectAccount/connect-account-provider';
import { ConnectAccount as _ConnectAccount } from './components/ConnectAccount/index';
import * as _ConnectHooks from './components/ConnectAccount/hooks';
import * as _ConnectConstants from './components/ConnectAccount/constants';
import * as _ConnectConnectors from './components/ConnectAccount/connectors';
import * as _ConnectUtils from './components/ConnectAccount/utils';
import { Loader as _Loader } from './components/ConnectAccount/components/Loader/index';
import { AccountDetails as _AccountDetails } from './components/ConnectAccount/components/AccountDetails/index';
import _parsePath from './utils/routes/parse-path';
import _parseQuery from './utils/routes/parse-query';
import _makePath from './utils/routes/make-path';
import _makeQuery from './utils/routes/make-query';
import _parseStringToArray from './utils/routes/parse-string-to-array';

export const ConnectAccount = {
  ConnectAccount: _ConnectAccount,
  ConnectAccountProvider: _ConnectAccountProvider,
  hooks:  _ConnectHooks,
  constants:  _ConnectConstants,
  connectors: _ConnectConnectors,
  Loader: _Loader,
  AccountDetails: _AccountDetails,
  utils: _ConnectUtils,
};
export const Constants = _Constants;
export const Utils = {
  addCommasToNumber,
  isMobileBrowser,
  isMobileBrowserTall,
  createBigNumber,
  DateUtils,
  Formatter,
  getPrecision,
  logError,
  windowRef,
};
export const Routes = {
  parsePath: _parsePath,
  parseQuery: _parseQuery,
  makePath: _makePath,
  makeQuery: _makeQuery,
  parseStringToArray: _parseStringToArray,
}
export const Types = _Types
export const MarketCard = _MarketCard;
export const Logo = _Logo;
export const Buttons = _Buttons;
export const Labels = _Labels;
export const Icons = _Icons;


const AugurComps = {
  Buttons,
  ConnectAccount,
  Constants,
  Icons,
  Labels,
  Logo,
  MarketCard,
  Routes,
  Types,
  Utils,
};

export default AugurComps;