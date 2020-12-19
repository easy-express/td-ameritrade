import { getQuery } from './constants';

type Quote = {
  // TODO
};

/**
 * Get quotes for a single symbol
 * @param {string} symbol the symbol to get the quote of
 * @param {string} apikey use apikey for delayed data with an unauthenticated request
 * @param {string} access_token an access token
 * @returns {Quote} the quote
 */
export const getQuote = async (symbol: string, access_token: string): Promise<Quote> => {
  const query = `/v1/marketdata/${symbol}/quotes`;

  return <Quote>getQuery(query, access_token);
};

/**
 * Get quotes for one or more symbols
 * @param {string[]} symbols the symbols to get the quotes of
 * @param {string} access_token an access token
 * @returns {Quote[]} the quotes
 */
export const getQuotes = async (symbols: string[], access_token: string): Promise<Quote[]> => {
  let symbol = '';
  symbols.forEach((s) => (symbol += s + ','));
  symbol = symbol.substr(0, symbol.length - 1);

  const query = `/v1/marketdata/quotes?symbol=${symbol}`;

  return <Quote[]>(<unknown>getQuery(query, access_token));
};
