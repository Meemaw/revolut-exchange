import React from 'react';
import TrendingUp from 'shared/components/icons/TrendingUp';
import { currencySymbol, CurrencyCode, currencyText } from 'shared/lib/currencies';
import { useStyletron } from 'baseui';

type Props = {
  from: CurrencyCode;
  to: CurrencyCode;
  exchangeRate: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const ExchangeRate = ({ from, to, exchangeRate, onClick }: Props) => {
  const [css, theme] = useStyletron();
  const fromSymbol = currencySymbol(from);
  const originText = `1${fromSymbol}`;
  const targetText = currencyText(to, exchangeRate.toFixed(4));

  return (
    <div
      onClick={onClick}
      className={css({
        display: 'inline-flex',
        width: 'fit-content',
        fontSize: '1em',
        borderRadius: '32px',
        border: `2px solid ${theme.colors.primary100}`,
        padding: '0.5em',
        backgroundColor: '#fff',
        cursor: 'pointer',
      })}
    >
      <TrendingUp fill={theme.colors.accent400} />
      <span className={css({ color: theme.colors.accent400, marginLeft: '8px' })}>
        {`${originText} = ${targetText}`}
      </span>
    </div>
  );
};

export default React.memo(ExchangeRate);
