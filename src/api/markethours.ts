import { instance } from '../public/TDAmeitradeModule';

enum MARKETS {
  EQUITY = 'EQUITY',
  OPTION = 'OPTION',
  FUTURE = 'FUTURE',
  BOND = 'BOND',
  FOREX = 'FOREX',
}

/**
 * Get market open hours for a specified date (e.g. 2020-09-18) and a specified market (use ENUM).
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object} config - takes market (ENUM is MARKETS), date, apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getSingleMarketHours = async (market: MARKETS, date: string, apikey: string) => {
  return instance?.getQuery(`/v1/marketdata/${market}/hours?date=${date}` + (apikey ? `?apikey=${apikey}` : ''));
};

/**
 * Get market open hours for a specified date (e.g. 2020-09-18) and a comma-separated set of markets from EQUITY, OPTION, FUTURE, BOND, or FOREX, e.g. "EQUITY,OPTION".
 * Can optionally use apikey for delayed data with an unauthenticated request.
 * @param {Object} config - takes markets, date, apikey (optional)
 * @returns {Promise<Object>} api GET result
 * @async
 */
export const getMultipleMarketHours = async (markets: MARKETS[], date: string, apikey: string) => {
  var marketsStr = '';
  markets.forEach((market) => {
    marketsStr += market.toString();
  });
  return instance?.getQuery(
    `/v1/marketdata/hours?markets=${marketsStr}&date=${date}` + (apikey ? `?apikey=${apikey}` : ''),
  );
};
