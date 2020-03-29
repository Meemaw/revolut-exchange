import React from 'react';
import { useStyletron } from 'baseui';
import SwitchVertical from 'shared/components/icons/SwitchVertical';

type Props = React.SVGProps<SVGSVGElement>;

const CurrencySwitch = (props: Props) => {
  const [css, theme] = useStyletron();
  const padding = '0.5em';

  return (
    <SwitchVertical
      data-testid="currency-switch"
      size={20}
      fill={theme.colors.accent400}
      className={css({
        padding,
        borderRadius: '32px',
        border: `2px solid ${theme.colors.primary100}`,
        top: `calc(-10px - ${padding})`,
        left: '16px',
        cursor: 'pointer',
        position: 'absolute',
        backgroundColor: '#fff',
      })}
      {...props}
    />
  );
};

export default React.memo(CurrencySwitch);
