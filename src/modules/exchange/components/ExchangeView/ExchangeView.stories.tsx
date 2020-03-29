import React, { useState } from 'react';
import { configureStory } from 'storybook/utils';
import fullHeightDecorator from 'storybook/utils/fullHeightDecorator';
import { DEFAULT_BALANCES } from 'shared/lib/currencies';
import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';
import ExchangeView from './ExchangeView';

export default {
  title: 'ExchangeView',
};

export const Base = () => {
  const [balances, setBalances] = useState(DEFAULT_BALANCES);

  return (
    <ExchangeView
      balances={balances}
      rates={USD_BASE_EXCHANGE_RATES}
      updateBalances={setBalances}
    />
  );
};
Base.story = configureStory({
  decorators: [fullHeightDecorator],
});
