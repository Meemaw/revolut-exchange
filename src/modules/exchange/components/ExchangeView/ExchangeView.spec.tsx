import React from 'react';
import { render, sandbox } from 'test/utils';
import { clickElement, typeText } from 'test/utils/events';
import openExchangeRates from 'api/openExchangeRates';
import { USD_BASE_EXCHANGE_RATES } from 'test/mocks/exchangeRates';

import { Base } from './ExchangeView.stories';

describe('<ExchangeView />', () => {
  it('Exchange button should be disabled if no input or balance exceeded', async () => {
    sandbox.stub(openExchangeRates, 'latest').resolves(USD_BASE_EXCHANGE_RATES);
    const { getByText, findByText, getAllByPlaceholderText } = render(<Base />);
    await findByText('Balance: kr10,000');
    const [originInput] = getAllByPlaceholderText('0') as HTMLInputElement[];

    const exchangeButton = getByText('Exchange') as HTMLButtonElement;
    expect(exchangeButton.disabled).toBeTruthy();

    typeText(originInput, '10.0');
    expect(exchangeButton.disabled).toBeFalsy();

    typeText(originInput, '10001.0');
    expect(exchangeButton.disabled).toBeTruthy();
  });

  it('Can do a full balance exchange', async () => {
    sandbox.stub(openExchangeRates, 'latest').resolves(USD_BASE_EXCHANGE_RATES);

    const { findByText, getAllByPlaceholderText, getByText, queryByText } = render(<Base />);
    const [originInput, targetInput] = getAllByPlaceholderText('0') as HTMLInputElement[];

    expect(originInput.value).toEqual('');

    const balance = await findByText('Balance: kr10,000');
    expect(queryByText('1kr = €0.0858')).toBeInTheDocument();

    clickElement(balance);
    expect(originInput.value).toEqual('10000');
    expect(targetInput.value).toEqual('857.68');

    clickElement(getByText('Exchange'));
    await findByText('You exchanged kr10000 to €857.68');

    clickElement(getByText('Done'));
    expect(queryByText('Balance: kr0')).toBeInTheDocument();
    expect(queryByText('Balance: €10,857.68')).toBeInTheDocument();
  });
});
