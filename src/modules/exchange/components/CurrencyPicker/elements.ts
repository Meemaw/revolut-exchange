import { styled, withStyle } from 'baseui';
import Flex from 'shared/components/flex/Flex';

export const CurrencyText = styled('span', (props) => ({
  ...props.$theme.typography.font750,
}));

export const CurrencyTextContainer = withStyle(Flex, {
  cursor: 'pointer',
});
