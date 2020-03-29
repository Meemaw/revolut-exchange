import useSWR, { ConfigInterface } from 'swr';
import balanceApi from 'api/balance';
import { Balances } from 'shared/lib/currencies';

const CACHE_KEY = '/balance';

const useBalance = (config?: ConfigInterface<Balances, Error>) => {
  return useSWR(CACHE_KEY, balanceApi.latest, config);
};

export default useBalance;
