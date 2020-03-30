import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import balanceApi from 'api/balance';
import openExhangeRates, { ExchangeRates } from 'api/openExchangeRates';
import { Balances, CurrencyCode, parseQueryCurrencies } from 'shared/lib/currencies';
import useBalance from 'shared/hooks/useBalance';
import useRates from 'shared/hooks/useRates';
import ExchangeView from 'modules/exchange/components/ExchangeView';

type Props = {
  balances: Balances;
  rates: ExchangeRates;
  origin: CurrencyCode;
  target: CurrencyCode;
};

const IndexPage = ({ balances: initialBalances, rates: initialRates, origin, target }: Props) => {
  const { data: balances, mutate: updateBalances } = useBalance({
    refreshInterval: 10,
    initialData: initialBalances,
  });
  const { data: rates } = useRates({ refreshInterval: 10, initialData: initialRates });

  return (
    <>
      <Head>
        <title>Exchange</title>
      </Head>
      <ExchangeView
        balances={balances}
        rates={rates}
        updateBalances={updateBalances}
        origin={origin}
        target={target}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { origin, target } = parseQueryCurrencies(ctx.query);
  const balancesPromise = balanceApi.latest();
  const ratesPromise = openExhangeRates.latest();
  const [balances, rates] = await Promise.all([balancesPromise, ratesPromise]);
  return Promise.resolve({ props: { balances, rates, origin, target } });
};

export default IndexPage;
