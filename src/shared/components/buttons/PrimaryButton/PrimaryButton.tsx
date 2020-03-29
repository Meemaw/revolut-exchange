import React from 'react';
import { Button, SHAPE, ButtonProps } from 'baseui/button';

type Props = Omit<ButtonProps, 'shape' | 'overrides'>;

const PrimaryButton = (props: Props) => {
  return (
    <Button
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style: {
            width: '100%',
            backgroundColor: 'rgb(235, 0, 141)',
            ':hover': {
              backgroundColor: 'rgb(210, 0, 126);',
            },
            ':disabled': {
              opacity: 0.5,
              backgroundColor: 'rgb(235, 0, 141)',
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default PrimaryButton;
