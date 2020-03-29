import { withStyle } from 'baseui';
import Flex from '../Flex';

const Centered = withStyle(Flex, {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default Centered;
