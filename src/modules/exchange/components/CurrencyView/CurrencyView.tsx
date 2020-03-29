import React from 'react';
import FlexColumn from 'shared/components/flex/FlexColumn';
import SpacedBetween from 'shared/components/flex/SpacedBetween';
import { CurrencyCode, currencyLocaleText } from 'shared/lib/currencies';
import CurrencyPicker from 'modules/exchange/components/CurrencyPicker';

import { StyledCurrencyView, BalanceText } from './elements';
import NumberInput from './NumberInput';

export type Props = {
  currency: CurrencyCode;
  value: string;
  onValueChange: (nextValue: string) => void;
  startEnhancer: '+' | '-';
  balance: number;
  recents: Set<CurrencyCode>;
  onCurrencySelected: (currency: CurrencyCode) => void;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
};

const CurrencyView = ({
  currency,
  value,
  onValueChange,
  startEnhancer,
  balance,
  recents,
  inputRef,
  onCurrencySelected,
  autoFocus = false,
}: Props) => {
  const balanceExceeded = startEnhancer === '-' && Number(value) > balance;
  const inputWidth = Math.min((value.length + 1) * 10, 200);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    onValueChange(event.currentTarget.value);
  };

  const onBalanceTextClick = () => {
    onValueChange(`${balance}`);
  };

  return (
    <StyledCurrencyView>
      <FlexColumn>
        <SpacedBetween>
          <CurrencyPicker
            currency={currency}
            recents={recents}
            onCurrencySelected={onCurrencySelected}
          />

          <NumberInput
            inputRef={inputRef}
            autoFocus={autoFocus}
            startEnhancer={value ? startEnhancer : undefined}
            value={value}
            onChange={onChange}
            size="large"
            overrides={{ Input: { style: { width: `${inputWidth}px` } } }}
          />
        </SpacedBetween>

        <BalanceText onClick={onBalanceTextClick} $negative={balanceExceeded}>
          {`Balance: ${currencyLocaleText(currency, balance)}`}
        </BalanceText>
      </FlexColumn>
    </StyledCurrencyView>
  );
};

export default React.memo(CurrencyView);
