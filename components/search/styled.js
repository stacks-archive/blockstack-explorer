import Styled from 'styled-components';
import { Input as BlockstackInput } from 'blockstack-ui';

export const Input = Styled(BlockstackInput)`
  ::selection {
    background-color: #1b79b1 !important;
  }
`;
