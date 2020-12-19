/**
 * Enum for order statuses, to use when retrieving account orders.
 * @enum
 */
enum ORDER_STATUS {
  AWAITING_PARENT_ORDER = 'AWAITING_PARENT_ORDER',
  AWAITING_CONDITION = 'AWAITING_CONDITION',
  AWAITING_MANUAL_REVIEW = 'AWAITING_MANUAL_REVIEW',
  ACCEPTED = 'ACCEPTED',
  AWAITING_UR_OUT = 'AWAITING_UR_OUT',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  QUEUED = 'QUEUED',
  WORKING = 'WORKING',
  REJECTED = 'REJECTED',
  PENDING_CANCEL = 'PENDING_CANCEL',
  CANCELED = 'CANCELED',
  PENDING_REPLACE = 'PENDING_REPLACE',
  REPLACED = 'REPLACED',
  FILLED = 'FILLED',
  EXPIRED = 'EXPIRED',
}

/**
 * Get all orders for a specified account, possibly filtered by time and order status
 * @param {Object} config - takes accountId, and optionally: maxResults,
 * fromEnteredTime, toEnteredTime (times must either both be included or omitted), status (ENUM is ORDER_STATUS)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getOrdersByAccount = async (
  accountId?: string,
  maxResults?: number,
  fromEnteredTime?: string,
  toEnteredTime?: string,
  status?: ORDER_STATUS,
) => {
  return (
    `/v1/accounts/${accountId}/orders?` +
    (maxResults ? `maxResults=${maxResults}&` : '') +
    (fromEnteredTime ? `fromEnteredTime=${fromEnteredTime}&` : '') +
    (toEnteredTime ? `toEnteredTime=${toEnteredTime}&` : '') +
    (status ? `status=${status}` : '')
  );
};

/**
 * Get all orders for all linked accounts, or just a specified account if accountId is provided, possibly filtered by time and order status
 * @param {Object} config - takes optional arguments: accountId, maxResults,
 * fromEnteredTime, toEnteredTime (times must either both be included or omitted), status (ENUM is ORDER_STATUS)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getOrdersByQuery = async (
  accountId?: string,
  maxResults?: number,
  fromEnteredTime?: string,
  toEnteredTime?: string,
  status?: ORDER_STATUS,
) => {
  return (
    `/v1/orders?` +
    (accountId ? `accountId=${accountId}&` : '') +
    (maxResults ? `maxResults=${maxResults}&` : '') +
    (fromEnteredTime ? `fromEnteredTime=${fromEnteredTime}&` : '') +
    (toEnteredTime ? `toEnteredTime=${toEnteredTime}&` : '') +
    (status ? `status=${status}` : '')
  );
};

/**
 * Get a specific order for a sepecific account
 * @param {Object} config - takes accountId, orderId
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getOrder = async (accountId: string, orderId: string) => {
  return `/v1/accounts/${accountId}/orders/${orderId}`;
};
