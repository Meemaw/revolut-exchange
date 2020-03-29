import React from 'react';
import FlexColumn from 'shared/components/flex/FlexColumn';
import { Check } from 'baseui/icon';
import { useStyletron } from 'baseui';
import { PullDown } from 'modules/exchange/components/ExchangeView/elements';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import Centered from 'shared/components/flex/Centered';
import { Paragraph1 } from 'baseui/typography';
import { CurrencyCode, currencySymbol } from 'shared/lib/currencies';

export type Props = {
  onDone: () => void;
  origin: {
    value: string;
    currency: CurrencyCode;
  };
  target: {
    value: string;
    currency: CurrencyCode;
  };
};

const ExchangeCompletedScreen = ({ onDone, origin, target }: Props) => {
  const [css, theme] = useStyletron();
  const color = theme.colors.accent400;
  const originSymbol = currencySymbol(origin.currency);
  const targetSymbol = currencySymbol(target.currency);
  const exchangeText = `You exchanged ${originSymbol}${origin.value} to ${targetSymbol}${target.value}`;

  return (
    <FlexColumn className={css({ height: '100%' })}>
      <Centered>
        <FlexColumn>
          <div className={css({ textAlign: 'center' })}>
            <Check
              size={96}
              color={color}
              overrides={{
                Svg: {
                  style: { borderRadius: '50%', border: `${theme.sizing.scale0} solid ${color}` },
                },
              }}
            />
          </div>
          <Paragraph1>{exchangeText}</Paragraph1>
        </FlexColumn>
      </Centered>
      <PullDown>
        <PrimaryButton onClick={onDone}>Done</PrimaryButton>
      </PullDown>
    </FlexColumn>
  );
};

export default ExchangeCompletedScreen;
