import React from 'react';
import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';
import { configureStory } from 'storybook/utils';
import fullHeightDecorator from 'storybook/utils/fullHeightDecorator';
import ExchangeRateHistory from './ExchangeRateHistory';

export default {
  title: 'ExchangeRateHistory',
};

export const Base = () => {
  return (
    <ExchangeRateHistory exchangeRate={USD_BASE_EXCHANGE_RATES.EUR} origin="NOK" target="EUR" />
  );
};
Base.story = configureStory({
  decorators: [fullHeightDecorator],
});
