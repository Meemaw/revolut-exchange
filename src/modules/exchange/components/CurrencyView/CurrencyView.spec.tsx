import React from 'react';
import { typeText, clickElement } from 'test/utils/events';
import { render } from 'test/utils';
import { CURRENCIES } from 'shared/lib/currencies';
import { NOK_120 } from './CurrencyView.stories';

describe('<CurrencyView />', () => {
  test('Should correctly handle number input', () => {
    const { queryByText, getByPlaceholderText } = render(<NOK_120 />);
    const valueInput = getByPlaceholderText('0') as HTMLInputElement;

    expect(queryByText('Balance: kr120')).toBeInTheDocument();
    expect(queryByText('NOK')).toBeInTheDocument();

    typeText(valueInput, 'a');
    expect(valueInput.value).toEqual('');

    typeText(valueInput, '1');
    expect(valueInput.value).toEqual('1');

    typeText(valueInput, '120.00');
    expect(valueInput.value).toEqual('120.00');

    typeText(valueInput, '120.000');
    expect(valueInput.value).toEqual('120.00');
  });

  it('Should mark balance as negative on balance exceeded', () => {
    const { getByText, getByPlaceholderText } = render(<NOK_120 />);
    const valueInput = getByPlaceholderText('0') as HTMLInputElement;

    const balanceText = getByText('Balance: kr120');
    const classNameBefore = balanceText.className;

    typeText(valueInput, '125');
    expect(balanceText.className).not.toEqual(classNameBefore);
  });

  it('Should be able to change currency', () => {
    const { getByText, queryByText } = render(<NOK_120 />);
    const currencyText = getByText('NOK');

    const countryCode = 'ALL';

    clickElement(currencyText);
    clickElement(getByText(CURRENCIES[countryCode].name));

    expect(currencyText.textContent).toEqual(countryCode);
    expect(queryByText(CURRENCIES[countryCode].name)).toBeNull(); // modal has closed
  });

  it('Should be able to navigate back from currency picker', () => {
    const { getByText, queryByText, container } = render(<NOK_120 />);
    const currencyText = getByText('NOK');

    clickElement(currencyText);
    expect(queryByText('Croatian Kuna')).toBeInTheDocument();

    const backButton = container.querySelector('button') as HTMLButtonElement;
    clickElement(backButton);
    expect(queryByText('Croatian Kuna')).toBeNull();
  });
});
