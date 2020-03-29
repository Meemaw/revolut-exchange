import React from 'react';
import CurrencyView, { Props as CurrencyViewProps } from 'modules/exchange/components/CurrencyView';

type Props = Omit<CurrencyViewProps, 'startEnhancer' | 'autoFocus'>;

const OriginCurrencyView = (props: Props) => {
  return <CurrencyView startEnhancer="-" autoFocus {...props} />;
};

export default React.memo(OriginCurrencyView);
