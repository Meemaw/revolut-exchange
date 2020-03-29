import React from 'react';
import { render } from '@testing-library/react';
import { NOKtoEUR, AEDtoEUR } from './ExchangeRate.stories';

describe('<ExchangeRate />', () => {
  test('NOKtoEUR', () => {
    const { queryByText } = render(<NOKtoEUR />);
    expect(queryByText('1kr = €0.0877')).toBeInTheDocument();
  });

  test('AEDtoEUR', () => {
    const { queryByText } = render(<AEDtoEUR />);
    expect(queryByText('1AED = €0.2605')).toBeInTheDocument();
  });
});
