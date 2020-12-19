enum ACCOUNT_FIELD {
  positions = 'positions',
  orders = 'orders',
}

/**
 * Gets account info for a single account.
 * @param {string} accountID the id of the account to get
 * @param {ACCOUNT_FIELD} fields the additional fields to get from the account
 * @returns {string} the api GET query string
 */
export const getAccount = (accountID: string, fields?: ACCOUNT_FIELD[]): string => {
  let field = '';
  fields?.forEach((f) => (field += f + ','));
  field = field.substr(0, field.length - 1);
  return `/v1/accounts/${accountID}` + (fields ? `?fields=${field}` : '');
};

/**
 * Gets account info for all linked accounts.
 * @param {ACCOUNT_FIELD} fields the additional fields to get from the account
 * @returns {string} the api GET query string
 */
export const getAccounts = (fields?: ACCOUNT_FIELD[]): string => {
  let field = '';
  fields?.forEach((f) => (field += f + ','));
  field = field.substr(0, field.length - 1);
  return `/v1/accounts` + (fields ? `?fields=${field}` : '');
};
