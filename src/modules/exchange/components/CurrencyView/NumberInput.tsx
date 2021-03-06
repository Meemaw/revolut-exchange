import React from 'react';
import { Input, InputProps } from 'baseui/input';
import { useStyletron } from 'baseui';
import merge from 'lodash/merge';

type Props = InputProps;

const NUMBER_INPUT_PATTERN = /^(\d+\.?\d{0,2})?$/;

const NumberInput = ({ onChange, overrides, ...rest }: Props) => {
  const [_, theme] = useStyletron();

  const onNumberInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.currentTarget;
    const match = nextValue.match(NUMBER_INPUT_PATTERN);
    if (match && onChange) {
      onChange(event);
    }
  };

  return (
    <Input
      placeholder="0"
      onChange={onNumberInputChange}
      size="compact"
      overrides={merge(
        {
          Root: { style: { width: 'auto', justifyContent: 'flex-end' } },
          Input: {
            style: {
              'text-align': 'right',
              caretColor: theme.colors.accent400,
              paddingLeft: '0px',
              paddingRight: '0px',
              paddingTop: '0px',
              paddingBottom: '0px',
            },
          },
          InputContainer: {
            style: {
              borderWidth: '0px',
              backgroundColor: 'transparent',
            },
          },
          StartEnhancer: {
            style: { backgroundColor: 'transparent', color: theme.colors.black },
          },
        },
        overrides
      )}
      {...rest}
    />
  );
};

export default NumberInput;
