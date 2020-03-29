import React from 'react';
import { useStyletron } from 'baseui';
import TrendingUp from 'shared/components/icons/TrendingUp';
import { currencySymbol, CurrencyCode, currencyText } from 'shared/lib/currencies';
import Link from 'shared/components/Link';
import { StyledExchangeRate, ExchangeRateText } from './elements';

type Props = {
  from: CurrencyCode;
  to: CurrencyCode;
  exchangeRate: number;
};

const ExchangeRate = ({ from, to, exchangeRate }: Props) => {
  const [css, theme] = useStyletron();
  const fromSymbol = currencySymbol(from);
  const originText = `1${fromSymbol}`;
  const targetText = currencyText(to, exchangeRate.toFixed(4));

  return (
    <Link to={`/historical?from=${from}&to=${to}`} className={css({ textDecoration: 'none' })}>
      <StyledExchangeRate>
        <TrendingUp fill={theme.colors.accent400} />
        <ExchangeRateText>{`${originText} = ${targetText}`}</ExchangeRateText>
      </StyledExchangeRate>
    </Link>
  );
};

export default React.memo(ExchangeRate);
