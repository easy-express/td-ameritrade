import { getQuery } from './constants';

export interface OptionChain {
  symbol: string;
  status: string;
  underlying: Underlying;
  strategy: string;
  interval: number;
  isDelayed: boolean;
  isIndex: boolean;
  interestRate: number;
  underlyingPrice: number;
  volatility: number;
  daysToExpiration: number;
  numberOfContracts: number;
  putExpDateMap: ExpDateMap;
  callExpDateMap: ExpDateMap;
}
export interface Underlying {
  symbol: string;
  description: string;
  change: number;
  percentChange: number;
  close: number;
  quoteTime: number;
  tradeTime: number;
  bid: number;
  ask: number;
  last: number;
  mark: number;
  markChange: number;
  markPercentChange: number;
  bidSize: number;
  askSize: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  totalVolume: number;
  exchangeName: string;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  delayed: boolean;
}
export interface ExpDateMap {
  [id: string]: ExpDate;
}

export interface ExpDate {
  [id: string]: Options;
}

export interface Options {
  [id: string]: OptionInfo;
}

export interface OptionInfo {
  putCall: string;
  symbol: string;
  description: string;
  exchangeName: string;
  bid: number;
  ask: number;
  last: number;
  mark: number;
  bidSize: number;
  askSize: number;
  bidAskSize: string;
  lastSize: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  closePrice: number;
  totalVolume: number;
  tradeDate?: null;
  tradeTimeInLong: number;
  quoteTimeInLong: number;
  netChange: number;
  volatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  openInterest: number;
  timeValue: number;
  theoreticalOptionValue: number;
  theoreticalVolatility: number;
  optionDeliverablesList?: null;
  strikePrice: number;
  expirationDate: number;
  daysToExpiration: number;
  expirationType: string;
  lastTradingDay: number;
  multiplier: number;
  settlementType: string;
  deliverableNote: string;
  isIndexOption?: null;
  percentChange: number;
  markChange: number;
  markPercentChange: number;
  nonStandard: boolean;
  inTheMoney: boolean;
  mini: boolean;
}

/**
 * Defines what range of strikes to return as results
 * @default ALL
 * @enum {string}
 */
enum RANGE {
  /** DEFAULT */
  ALL = 'ALL',
  /** In-the-money strikes */
  ITM = 'ITM',
  /** Near-the-money strikes */
  NTM = 'NTM',
  /** Out-of-the-money strikes */
  OTM = 'OTM',
  /** Strikes Above Market */
  SAK = 'SAK',
  /** Strikes Below Market */
  SBK = 'SBK',
  /** Strikes Near Market */
  SNK = 'SNK',
}

/**
 * @default ALL
 * @enum {string}
 */
enum CONTRACT_TYPE {
  /** DEFAULT */
  ALL = 'ALL',
  CALL = 'CALL',
  PUT = 'PUT',
}

/**
 * @default ALL
 * @enum {string}
 */
enum EXPIRATION_MONTH {
  /** DEFAULT */
  ALL = 'ALL',
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC',
}

/**
 * @default ALL
 * @enum {string}
 */
enum OPTION_TYPE {
  /** DEFAULT */
  ALL = 'ALL',
  /** Standard contracts */
  STANDARD = 'S',
  /** Non-standard contracts */
  NONSTANDARD = 'NS',
}

type OptionChainArgs = {
  symbol: string;
  contractType: CONTRACT_TYPE;
  expMonth?: EXPIRATION_MONTH;
  optionType?: OPTION_TYPE;
  range?: RANGE;
  daysToExpiration?: number;
};

/**
 * Get an options chain for a given symbol. Carefully use config options.
 * @returns {Promise<Option>} api GET result
 * @async
 */
export const getOptionChain = async (config: OptionChainArgs, accessToken: string): Promise<OptionChain> => {
  const query =
    `/v1/marketdata/chains?` +
    `symbol=${config.symbol}` +
    `&contractType=${config.contractType}` +
    `&expMonth=${config.expMonth ? config.expMonth : EXPIRATION_MONTH.ALL}` +
    `&optionType=${config.optionType ? config.optionType : OPTION_TYPE.ALL}` +
    `&range=${config.range ? config.range : RANGE.ALL}` +
    `&includeQuotes=true` +
    (config.daysToExpiration ? `&daysToExpiration=${config.daysToExpiration}` : '');

  return getQuery<OptionChain>(query, accessToken);
};
