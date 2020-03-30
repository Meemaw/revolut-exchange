import React from 'react';
import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';
import { configureStory } from 'storybook/utils';
import fullHeightDecorator from 'storybook/utils/fullHeightDecorator';
import ExchangeRateHistorical from './ExchangeRateHistorical';

export default {
  title: 'ExchangeRateHistorical',
};

export const Base = () => {
  return (
    <ExchangeRateHistorical exchangeRate={USD_BASE_EXCHANGE_RATES.EUR} origin="NOK" target="EUR" />
  );
};
Base.story = configureStory({
  decorators: [fullHeightDecorator],
});
