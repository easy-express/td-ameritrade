/**
 * Get quotes for a single symbol
 * @param {string} symbol the symbol to get the quote of
 * @param {string} apikey use apikey for delayed data with an unauthenticated request
 * @returns {string} the api GET query string
 */
export const getQuote = (symbol: string, apikey: string): string => {
  return `/v1/marketdata/${symbol}/quotes` + (apikey ? `&apikey=${apikey}` : '');
};

/**
 * Get quotes for one or more symbols
 * @param {string[]} symbols the symbols to get the quotes of
 * @param {string} apikey use apikey for delayed data with an unauthenticated request
 * @returns {string} the api GET query string
 */
export const getQuotes = (symbols: string[], apikey: string): string => {
  let symbol = '';
  symbols.forEach((s) => (symbol += s + ','));
  symbol = symbol.substr(0, symbol.length - 1);
  return `/v1/marketdata/quotes?symbol=${symbol}` + (apikey ? `&apikey=${apikey}` : '');
};
