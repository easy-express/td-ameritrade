/**
 * Enum for the transaction types
 * @enum
 */
enum TRANSACTION_TYPE {
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

/**
 * Gets all transactions for a specific account with the set options.
 *
 * @param accountId the id of the account
 * @param type the type of transactions to get
 * @param startDate the date in which to start searching
 * @param endDate the date in which to stop searching
 * @param symbol the transactions related to the given symbol
 * @returns {string} the api GET query string
 */
export const getTransactions = (
  accountId: string,
  type?: TRANSACTION_TYPE,
  startDate?: string,
  endDate?: string,
  symbol?: string,
) => {
  return (
    `/v1/accounts/${accountId}/transactions?` +
    (type ? `type=${type}&` : '') +
    (startDate ? `startDate=${startDate}&` : '') +
    (endDate ? `endDate=${endDate}&` : '') +
    (symbol ? `symbol=${symbol}` : '')
  );
};

/**
 * Get a specific transaction for a specified account
 * @param {string} accountId - the id of the account
 * @param {string} transactionId - the id of the transaction
 * @returns {string} the api GET query string
 */
export const getTransaction = (accountId: string, transactionId: string): string => {
  return `/v1/accounts/${accountId}/transactions/${transactionId}`;
};
