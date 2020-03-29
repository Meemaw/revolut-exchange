import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import openExchangeRates, { ExchangeRates } from 'api/openExchangeRates';
import useRates from 'shared/hooks/useRates';
import { CurrencyCode, calculateExchangeRate, parseQueryCurrencies } from 'shared/lib/currencies';
import ExchangeRateHistory from 'modules/exchange/components/ExchangeRateHistory';

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
  return <ExchangeRateHistory exchangeRate={exchangeRate} origin={origin} target={target} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { origin, target } = parseQueryCurrencies(ctx.query);
  const rates = await openExchangeRates.latest();
  return Promise.resolve({ props: { rates, origin, target } });
};

export default HistoricalPage;
