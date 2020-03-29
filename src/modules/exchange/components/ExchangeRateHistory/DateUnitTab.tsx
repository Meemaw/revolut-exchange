import React from 'react';
import { useStyletron } from 'baseui';
import { Paragraph4 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Granularity } from './types';

type Props = Granularity & {
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const DateUnitTab = ({ unit, active = false, amount = 1, onClick }: Props) => {
  const [_, theme] = useStyletron();

  return (
    <Button
      kind="minimal"
      $style={{
        boxSizing: 'border-box',
        borderTopStyle: 'solid',
        borderTopWidth: active ? theme.sizing.scale0 : '1px',
        borderTopColor: active ? theme.colors.black : theme.colors.primary400,
        width: '100%',
      }}
      onClick={onClick}
    >
      <Paragraph4 margin={0} padding={theme.sizing.scale500} $style={{ opacity: active ? 1 : 0.5 }}>
        {amount}
        {unit}
      </Paragraph4>
    </Button>
  );
};

export default React.memo(DateUnitTab);
