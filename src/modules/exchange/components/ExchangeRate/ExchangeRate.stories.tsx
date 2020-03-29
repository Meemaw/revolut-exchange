import React from 'react';
import { action } from '@storybook/addon-actions';
import ExchangeRate from './ExchangeRate';

export default {
  title: 'ExchangeRate',
};

const baseProps = {
  onClick: action('onClick'),
};

export const NOKtoEUR = () => {
  return <ExchangeRate {...baseProps} from="NOK" to="EUR" exchangeRate={0.0877} />;
};
NOKtoEUR.story = {
  name: 'NOK -> EUR',
};

export const AEDtoEUR = () => {
  return <ExchangeRate {...baseProps} from="AED" to="EUR" exchangeRate={0.2605} />;
};
AEDtoEUR.story = {
  name: 'AED -> EUR',
};
