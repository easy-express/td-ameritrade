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
 * Gets all transactions for a specific account with the set options, such as symbol, type, startDate (yyyy-MM-dd), endDate (yyyy-MM-dd) (maximum time span is 1 year)
 * @param {Object} config - takes accountId, and optionally: type (ENUM is TRANSACTION_TYPE), startDate (yyyy-MM-dd), endDate (yyyy-MM-dd)
 * @returns {Promise<Object>} api GET result
 * @async
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
 * Get a sepcific transaction for a specified account
 * @param {Object} config - takes accountId, transactionId
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getTransaction = (accountId: string, transactionId: string) => {
  return `/v1/accounts/${accountId}/transactions/${transactionId}`;
};
