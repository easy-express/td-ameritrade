import { instance } from '../public/TDAmeitradeModule';

enum PROJECTION_TYPE {
  SYMBOL_SEARCH = 'symbol-search',
  SYMBOL_REGEX = 'symbol-regex',
  DESC_SEARCH = 'desc-search',
  DESC_REGEX = 'desc-regex',
  FUNDAMENTAL = 'fundamental',
}

/**
 * Search for an instrument using search string or regex (symbol) and search type (projection>)
 * projection (use ENUM) is one of: symbol-search, symbol-regex, desc-search, desc-regex, fundamental.
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object}  - takes symbol, projection (ENUM is PROJECTION_TYPE), apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const searchInstruments = async (symbol: string, projection: PROJECTION_TYPE, apikey: string) => {
  return instance?.getQuery(
    `/v1/instruments?symbol=${symbol}&projection=${projection}` + (apikey ? `?apikey=${apikey}` : ''),
  );
};

/**
 * Get an instrument by CUSIP (unique id number assigned to all stocks and registered bonds in US/CA).
 * List of instruments here: https://www.sec.gov/divisions/investment/13flists.htm
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object}  - takes cusip, apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getInstrument = async (cusip: string, apikey: string) => {
  return instance?.getQuery(`/v1/instruments/${cusip}` + (apikey ? `?apikey=${apikey}` : ''));
};
