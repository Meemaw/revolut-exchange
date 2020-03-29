import useSWR, { ConfigInterface } from 'swr';
import openExhangeRates, { ExchangeRates } from 'api/openExchangeRates';

const CACHE_KEY = '/rates';

const useRates = (config?: ConfigInterface<ExchangeRates, Error>) => {
  return useSWR(CACHE_KEY, openExhangeRates.latest, config);
};

export default useRates;
