import { styled } from 'baseui';

export const StyledExchangeRate = styled('div', (props) => ({
  display: 'inline-flex',
  width: 'fit-content',
  fontSize: '1em',
  borderRadius: props.$theme.sizing.scale900,
  border: `${props.$theme.sizing.scale0} solid ${props.$theme.colors.primary100}`,
  padding: '0.5em',
  backgroundColor: props.$theme.colors.white,
}));

export const ExchangeRateText = styled('span', (props) => ({
  color: props.$theme.colors.accent400,
  marginLeft: props.$theme.sizing.scale400,
}));
