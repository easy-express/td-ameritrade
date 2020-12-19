import { instance } from '../public/TDAmeitradeModule';

/**
 * Gets account info for a single account. You can request additional fields with .fields as a comma-separated string.
 * Possible values for fields are: positions, orders
 * @param
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getAccount = async (accountID: string, fields?: string) => {
  return instance?.getQuery(`/v1/accounts/${accountID}` + (fields ? `?fields=${fields}` : ''));
};

/**
 * Gets account info for all linked accounts. You can request additional fields with .fields as a comma-separated string.
 * Possible values for fields are: positions, orders
 * @param {Object}  - takes fields (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getAccounts = async (fields?: string) => {
  return instance?.getQuery(`/v1/accounts` + (fields ? `?fields=${fields}` : ''));
};
