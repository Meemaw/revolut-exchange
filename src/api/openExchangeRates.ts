import ky from 'ky-universal';
import { USD_BASE_EXCHANGE_RATES, applyNoise } from 'test/mocks/exchangeRates';
import { MOCK_API_TIMEOUT_MILLIS } from './base';

export type ExchangeRates = Record<string, number>;

export type LatestExchangeRatesResponse = {
  timestamp: number;
  base: string;
  rates: ExchangeRates;
};

type OpenExchangeRateApi = {
  latest: () => Promise<ExchangeRates>;
};

/*
 * Mock open exchange rate API for development to not kill API free tier quota
 */
const openExchangeRateApiMockImplementation: OpenExchangeRateApi = {
  latest: (() => {
    const noiseFactor = 0.005;
    let currentRates = USD_BASE_EXCHANGE_RATES;
    let callCount = 0;

    return () => {
      // dont apply noise on first call
      if (callCount > 0) {
        currentRates = applyNoise(currentRates, noiseFactor);
      }
      callCount++;
      return new Promise<ExchangeRates>((resolve) =>
        setTimeout(() => resolve(currentRates), MOCK_API_TIMEOUT_MILLIS)
      );
    };
  })(),
};

const openExhangeRateApi: OpenExchangeRateApi = {
  latest: () =>
    ky
      .get('https://openexchangerates.org/api/latest.json?app_id=95006d6af8ab4680bfb92c2059b6a8df')
      .json<LatestExchangeRatesResponse>()
      .then((response) => response.rates),
};

export default process.env.NODE_ENV !== 'production'
  ? openExchangeRateApiMockImplementation
  : openExhangeRateApi;
