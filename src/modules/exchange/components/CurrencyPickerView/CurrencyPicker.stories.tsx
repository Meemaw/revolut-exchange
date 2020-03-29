import React from 'react';
import { action } from '@storybook/addon-actions';
import { CurrencyCode, CURRENCIES, Currencies } from 'shared/lib/currencies';

import CurrencyPickerView, { Props } from './CurrencyPickerView';

export default {
  title: 'CurrencyPickerView',
};

const baseProps = {
  back: action('back'),
  onSelected: action('onClick'),
};

type StoryProps = Pick<Props, 'back'>;

export const Base = (storyProps: StoryProps) => {
  return <CurrencyPickerView {...baseProps} {...storyProps} />;
};

export const WithRecents = (storyProps: StoryProps) => {
  return (
    <CurrencyPickerView
      {...baseProps}
      {...storyProps}
      recents={new Set(['NOK', 'EUR']) as Set<CurrencyCode>}
    />
  );
};

export const WithSingleCurrency = (storyProps: StoryProps) => {
  return (
    <CurrencyPickerView
      {...baseProps}
      {...storyProps}
      currencies={{ USD: CURRENCIES.USD } as Currencies}
    />
  );
};
