import React, { useState } from 'react';
import { CurrencyCode } from 'shared/lib/currencies';
import CurrencyView from './CurrencyView';

export default {
  title: 'CurrencyView',
};

type UseCurrencyViewOptions = {
  initialCurrency?: CurrencyCode;
};

const useCurrencyView = ({ initialCurrency = 'NOK' }: UseCurrencyViewOptions = {}) => {
  const [value, onValueChange] = useState('');
  const [currency, onCurrencySelected] = useState<CurrencyCode>(initialCurrency);

  return { value, currency, onCurrencySelected, onValueChange };
};

export const NOK_120 = () => {
  const baseProps = useCurrencyView();

  return <CurrencyView {...baseProps} startEnhancer="-" balance={120} recents={new Set()} />;
};

export const USD_500 = () => {
  const baseProps = useCurrencyView({ initialCurrency: 'USD' });

  return (
    <CurrencyView
      {...baseProps}
      startEnhancer="-"
      balance={500}
      recents={new Set(['NOK']) as Set<CurrencyCode>}
    />
  );
};
