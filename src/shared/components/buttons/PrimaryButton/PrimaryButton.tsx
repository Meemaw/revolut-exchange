import React from 'react';
import { Button, SHAPE, ButtonProps } from 'baseui/button';

type Props = Omit<ButtonProps, 'shape' | 'overrides'>;

const colorPrimary = 'rgb(235, 0, 141)';
const colorPrimaryActive = 'rgb(210, 0, 126)';

const PrimaryButton = (props: Props) => {
  return (
    <Button
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style: {
            width: '100%',
            backgroundColor: colorPrimary,
            ':hover': { backgroundColor: colorPrimaryActive },
            ':disabled': { opacity: 0.5, backgroundColor: colorPrimary },
          },
        },
      }}
      {...props}
    />
  );
};

export default PrimaryButton;
