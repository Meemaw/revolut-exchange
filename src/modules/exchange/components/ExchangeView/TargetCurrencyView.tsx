import React from 'react';
import CurrencyView, { Props as CurrencyViewProps } from 'modules/exchange/components/CurrencyView';

type Props = Omit<CurrencyViewProps, 'startEnhancer' | 'autoFocus'>;

const TargetCurrencyView = (props: Props) => {
  return <CurrencyView startEnhancer="+" {...props} />;
};

export default React.memo(TargetCurrencyView);
