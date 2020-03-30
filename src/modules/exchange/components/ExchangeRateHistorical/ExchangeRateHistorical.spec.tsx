import React from 'react';
import { render } from 'test/utils';
import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';
import { Base } from './ExchangeRateHistorical.stories';

describe('<ExchangeRateHistorical />', () => {
  it('Should render graph & its controls', () => {
    const { queryByText } = render(<Base />);

    expect(queryByText('NOK → EUR')).toBeInTheDocument();
    expect(queryByText(USD_BASE_EXCHANGE_RATES.EUR.toFixed(4))).toBeInTheDocument();

    expect(queryByText('lowest')).toBeInTheDocument();
    expect(queryByText('current')).toBeInTheDocument();
    expect(queryByText('highest')).toBeInTheDocument();

    expect(queryByText('1d')).toBeInTheDocument();
    expect(queryByText('1w')).toBeInTheDocument();
    expect(queryByText('1m')).toBeInTheDocument();
    expect(queryByText('3m')).toBeInTheDocument();
    expect(queryByText('6m')).toBeInTheDocument();
    expect(queryByText('1y')).toBeInTheDocument();
  });
});
