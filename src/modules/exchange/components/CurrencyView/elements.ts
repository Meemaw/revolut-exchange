import { styled } from 'baseui';

export const StyledCurrencyView = styled('div', (props) => ({
  padding: `${props.$theme.sizing.scale900} ${props.$theme.sizing.scale600}`,
}));

export const BalanceText = styled<{ $negative: boolean }, 'span'>('span', (props) => ({
  width: 'fit-content',
  paddingTop: props.$theme.sizing.scale300,
  cursor: 'pointer',
  color: props.$negative ? props.$theme.colors.negative400 : props.$theme.colors.primary400,
}));
