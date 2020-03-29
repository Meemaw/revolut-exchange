import React from 'react';
import { useStyletron } from 'baseui';
import SwitchVertical from 'shared/components/icons/SwitchVertical';

type Props = React.SVGProps<SVGSVGElement>;

const CurrencySwitch = (props: Props) => {
  const [css, theme] = useStyletron();
  const padding = '0.5em';

  const className = css({
    padding,
    borderRadius: theme.sizing.scale900,
    border: `${theme.sizing.scale0} solid ${theme.colors.primary100}`,
    top: `calc(-${theme.sizing.scale400} - ${padding})`,
    left: theme.sizing.scale600,
    cursor: 'pointer',
    position: 'absolute',
    backgroundColor: '#fff',
  });

  return (
    <SwitchVertical
      data-testid="currency-switch"
      size={20}
      fill={theme.colors.accent400}
      className={className}
      {...props}
    />
  );
};

export default React.memo(CurrencySwitch);
