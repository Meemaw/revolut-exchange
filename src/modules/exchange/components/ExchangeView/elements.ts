import { styled, withStyle } from 'baseui';
import Flex from 'shared/components/flex/Flex';

export const StyledBottom = withStyle<typeof Flex, {}>(Flex, (props) => ({
  height: '100%',
  position: 'relative',
  flexDirection: 'column',
  backgroundColor: props.$theme.colors.primary100,
}));

export const StyledExchangeRateOverlay = withStyle(Flex, {
  top: 'calc(-12px - 0.5em)',
  left: '50%',
  position: 'absolute',
  transform: 'translate(-50%, 0)',
});

export const PullDown = styled('div', {
  padding: '16px',
  marginTop: 'auto',
});
