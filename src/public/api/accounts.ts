import { getQuery } from './constants';

enum ACCOUNT_FIELD {
  positions = 'positions',
  orders = 'orders',
}

export type Account = {
  securitiesAccount: SecuritiesAccount;
};

export type SecuritiesAccount = {
  type: string;
  accountId: string;
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  initialBalances: InitialBalances;
  currentBalances: CurrentBalances;
  projectedBalances: ProjectedBalances;
};

export type InitialBalances = {
  accruedInterest: number;
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
  bondValue: number;
  cashReceipts: number;
  liquidationValue: number;
  longOptionMarketValue: number;
  longStockValue: number;
  moneyMarketFund: number;
  mutualFundValue: number;
  shortOptionMarketValue: number;
  shortStockValue: number;
  isInCall: boolean;
  unsettledCash: number;
  cashDebitCallValue: number;
  pendingDeposits: number;
  accountValue: number;
};

export type CurrentBalances = {
  accruedInterest: number;
  cashBalance: number;
  cashReceipts: number;
  longOptionMarketValue: number;
  liquidationValue: number;
  longMarketValue: number;
  moneyMarketFund: number;
  savings: number;
  shortMarketValue: number;
  pendingDeposits: number;
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashCall: number;
  longNonMarginableMarketValue: number;
  totalCash: number;
  shortOptionMarketValue: number;
  mutualFundValue: number;
  bondValue: number;
  cashDebitCallValue: number;
  unsettledCash: number;
};

export type ProjectedBalances = {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
};

/**
 * Gets account info for a single account.
 * @param {string} accountID the id of the account to get
 * @param {string} accessToken an access token
 * @param {ACCOUNT_FIELD} fields the additional fields to get from the account
 * @returns {Promise<Account>} the account
 */
export const getAccount = async (
  accountID: string,
  accessToken: string,
  fields?: ACCOUNT_FIELD[],
): Promise<Account> => {
  let field = '';
  fields?.forEach((f) => (field += f + ','));
  field = field.substr(0, field.length - 1);

  const query = `/v1/accounts/${accountID}` + (fields ? `?fields=${field}` : '');

  return getQuery<Account>(query, accessToken);
};

/**
 * Gets account info for all linked accounts.
 * @param {string} accessToken an access token
 * @param {ACCOUNT_FIELD} fields the additional fields to get from the account
 * @returns {string} the accounts
 */
export const getAccounts = async (accessToken: string, fields?: ACCOUNT_FIELD[]): Promise<Account[]> => {
  let field = '';
  fields?.forEach((f) => (field += f + ','));
  field = field.substr(0, field.length - 1);

  const query = `/v1/accounts` + (fields ? `?fields=${field}` : '');

  return getQuery<Account[]>(query, accessToken);
};
