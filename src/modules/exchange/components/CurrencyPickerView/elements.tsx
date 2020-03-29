import React from 'react';
import { styled } from 'baseui';
import { Paragraph4 } from 'baseui/typography';
import { CurrencyCode, Currencies } from 'shared/lib/currencies';
import { Flag } from 'baseui/phone-input';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import FlagEU from 'baseui/phone-input/flags/FlagEU';

export const SectionParagraph = styled(Paragraph4, (props) => ({
  paddingLeft: props.$theme.sizing.scale800,
  color: props.$theme.colors.primary400,
}));

export const flagComponent = (currencies: Currencies, currency: CurrencyCode) => {
  const { countryCode } = currencies[currency];
  const width = '16px';
  let FlagComponent: React.ReactNode;
  if (countryCode === 'EU') {
    FlagComponent = <FlagEU width={width} />;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FlagComponent = <Flag iso={countryCode as any} />;
  }

  return () => FlagComponent;
};
