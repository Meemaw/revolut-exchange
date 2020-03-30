import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import openExchangeRates, { ExchangeRates } from 'api/openExchangeRates';
import useRates from 'shared/hooks/useRates';
import { CurrencyCode, calculateExchangeRate, parseQueryCurrencies } from 'shared/lib/currencies';
import ExchangeRateHistorical from 'modules/exchange/components/ExchangeRateHistorical';

type Props = {
  rates: ExchangeRates;
  origin: CurrencyCode;
  target: CurrencyCode;
};

const HistoricalPage = ({ rates: initialRates, origin, target }: Props) => {
  const { data: rates } = useRates({ initialData: initialRates });
  const exchangeRate = useMemo(() => calculateExchangeRate(rates, origin, target), [
    rates,
    origin,
    target,
  ]);
  return (
    <>
      <Head>
        <title>
          Historical | {origin} &#8594; {target}
        </title>
      </Head>
      <ExchangeRateHistorical exchangeRate={exchangeRate} origin={origin} target={target} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { origin, target } = parseQueryCurrencies(ctx.query);
  const rates = await openExchangeRates.latest();
  return Promise.resolve({ props: { rates, origin, target } });
};

export default HistoricalPage;
