import { ExchangeRates } from 'api/openExchangeRates';

export const CURRENCIES = {
  AED: {
    name: 'United Arab Emirates Dirham',
    symbol: 'AED',
    countryCode: 'AE',
  },
  AFN: { name: 'Afghan Afghani', symbol: 'Af', countryCode: 'AF' },
  ALL: { name: 'Albanian Lek', symbol: 'L', countryCode: 'AL' },
  AMD: { name: 'Armenian Dram', symbol: '֏', countryCode: 'AM' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', countryCode: 'BR' },
  CAD: { name: 'Canadian Dollar', symbol: '$', countryCode: 'CA' },
  CHF: { name: 'Swiss Franc', symbol: 'CHF', countryCode: 'CH' },
  DKK: { name: 'Danish Krone', symbol: 'kr.', countryCode: 'DK' },
  EUR: { name: 'Euro', symbol: '€', countryCode: 'EU' },
  GBP: { name: 'British Pound Sterling', symbol: '£', countryCode: 'GB' },
  HRK: { name: 'Croatian Kuna', symbol: 'kn', countryCode: 'HR' },
  HUF: { name: 'Hungarian Forint', symbol: 'Ft', countryCode: 'HU' },
  ISK: { name: 'Icelandic Króna', symbol: 'kr', countryCode: 'IS' },
  NOK: { name: 'Norwegian Krone', symbol: 'kr', countryCode: 'NO' },
  PLN: { name: 'Polish Zloty', symbol: 'zł', countryCode: 'PL' },
  RSD: { name: 'Serbian Dinar', symbol: 'din', countryCode: 'RS' },
  RUB: { name: 'Russian Ruble', symbol: '₽', countryCode: 'RU' },
  SEK: { name: 'Swedish Krona', symbol: 'kr', countryCode: 'SE' },
  USD: { name: 'United States Dollar', symbol: '$', countryCode: 'US' },
};

export type Balances = Record<string, number>;

/* You are rich :) */
export const DEFAULT_BALANCES: Balances = Object.keys(CURRENCIES).reduce((acc, countryCode) => {
  return { ...acc, [countryCode]: 10000.0 };
}, {});

export type CurrencyCode = keyof typeof CURRENCIES;

export type Currencies = Record<
  CurrencyCode,
  { name: string; symbol: string; countryCode: string }
>;

export const currencySymbol = (currency: CurrencyCode) => {
  return CURRENCIES[currency].symbol;
};

export const currencyName = (currency: CurrencyCode) => {
  return CURRENCIES[currency].name;
};

export const currencyText = (currency: CurrencyCode, value: string | number) => {
  return `${currencySymbol(currency)}${value}`;
};

export const currencyLocaleText = (currency: CurrencyCode, value: number) => {
  return currencyText(currency, value.toLocaleString());
};

export const calculateExchangeRate = (
  rates: ExchangeRates,
  originCurrency: string,
  targetCurrency: string
) => {
  const baseToOrigin = rates[originCurrency];
  const baseToTarget = rates[targetCurrency];
  return baseToTarget * (1 / baseToOrigin);
};

export const calculateOriginValue = (targetValue: string, exchangeRate: number): string => {
  return (Number(targetValue) / exchangeRate).toFixed(2);
};

export const calculateTarget = (originValue: number, exchangeRate: number) => {
  return originValue * exchangeRate;
};

export const calculateTargetValue = (originValue: string, exchangeRate: number): string => {
  return calculateTarget(Number(originValue), exchangeRate).toFixed(2);
};
