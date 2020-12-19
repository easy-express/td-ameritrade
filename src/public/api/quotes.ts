/**
 * Get quotes for a single symbol, e.g. AAPL
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object} config - takes symbol, apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getQuote = (symbol: string, apikey: string) => {
  return `/v1/marketdata/${symbol}/quotes` + (apikey ? `&apikey=${apikey}` : '');
};

/**
 * Get quotes for one or more symbols using a comma-separated string, e.g. F,O,TSLA.
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object} config - takes symbol, apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getQuotes = (symbols: string, apikey: string) => {
  return `/v1/marketdata/quotes?symbol=${symbols}` + (apikey ? `&apikey=${apikey}` : '');
};
