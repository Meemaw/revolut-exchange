import React from 'react';
import ExchangeView from 'modules/exchange/components/ExchangeView';
import { GetServerSideProps } from 'next';
import balanceApi from 'api/balance';
import { Balances } from 'shared/lib/currencies';
import openExhangeRates, { ExchangeRates } from 'api/openExchangeRates';
import useBalance from 'shared/hooks/useBalance';
import useRates from 'shared/hooks/useRates';

type Props = {
  balances: Balances;
  rates: ExchangeRates;
};

const IndexPage = ({ balances: initialBalances, rates: initialRates }: Props) => {
  const { data: balances, mutate: updateBalances } = useBalance({
    refreshInterval: 10,
    initialData: initialBalances,
  });
  const { data: rates } = useRates({ refreshInterval: 10, initialData: initialRates });

  return <ExchangeView balances={balances} rates={rates} updateBalances={updateBalances} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
  const balancesPromise = balanceApi.latest();
  const ratesPromise = openExhangeRates.latest();
  const [balances, rates] = await Promise.all([balancesPromise, ratesPromise]);
  return Promise.resolve({ props: { balances, rates } });
};

export default IndexPage;
