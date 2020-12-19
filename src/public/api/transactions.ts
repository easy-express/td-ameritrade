import { getQuery } from './constants';

export enum TRANSACTION_TYPE {
  ALL = 'ALL',
  TRADE = 'TRADE',
  BUY_ONLY = 'BUY_ONLY',
  SELL_ONLY = 'SELL_ONLY',
  CASH_IN_OR_CASH_OUT = 'CASH_IN_OR_CASH_OUT',
  CHECKING = 'CHECKING',
  DIVIDEND = 'DIVIDEND',
  INTEREST = 'INTEREST',
  OTHER = 'OTHER',
  ADVISOR_FEES = 'ADVISOR_FEES',
}

export interface Transaction {
  type: TRANSACTION_TYPE;
  subAccount: string;
  settlementDate: string;
  orderId?: string | null;
  netAmount: number;
  transactionDate: string;
  orderDate?: string | null;
  transactionSubType: string;
  transactionId: number;
  cashBalanceEffectFlag: boolean;
  description: string;
  fees: Fees;
  transactionItem: TransactionItem;
}

export interface Fees {
  rFee: number;
  additionalFee: number;
  cdscFee: number;
  regFee: number;
  otherCharges: number;
  commission: number;
  optRegFee: number;
  secFee: number;
}

export interface TransactionItem {
  accountId: number;
  amount: number;
  price?: number | null;
  cost: number;
  instruction?: string | null;
  positionEffect?: string | null;
  instrument: Instrument;
}

export interface Instrument {
  symbol?: string | null;
  underlyingSymbol?: string | null;
  optionExpirationDate?: string | null;
  putCall?: string | null;
  cusip: string;
  description?: string | null;
  assetType: string;
}

/**
 * Gets all transactions for a specific account with the set options.
 *
 * @param accountId the id of the account
 * @param {string} accessToken an access token
 * @param type the type of transactions to get
 * @param startDate the date in which to start searching
 * @param endDate the date in which to stop searching
 * @param symbol the transactions related to the given symbol
 * @returns {Transaction[]} the transactions fitting the given criteria
 */
export const getTransactions = (
  accountId: string,
  accessToken: string,
  type?: TRANSACTION_TYPE,
  startDate?: string,
  endDate?: string,
  symbol?: string,
): Promise<Transaction[]> => {
  const query =
    `/v1/accounts/${accountId}/transactions?` +
    (type ? `type=${type}&` : '') +
    (startDate ? `startDate=${startDate}&` : '') +
    (endDate ? `endDate=${endDate}&` : '') +
    (symbol ? `symbol=${symbol}` : '');

  return getQuery<Transaction[]>(query, accessToken);
};

/**
 * Get a specific transaction for a specified account
 * @param {string} accountId - the id of the account
 * @param {string} transactionId - the id of the transaction
 * @param {string} accessToken an access token
 * @returns {Transaction} the transaction
 */
export const getTransaction = (accountId: string, transactionId: string, accessToken: string): Promise<Transaction> => {
  const query = `/v1/accounts/${accountId}/transactions/${transactionId}`;
  return getQuery<Transaction>(query, accessToken);
};
