import Styled from 'styled-components';
import { Input as RebassInput } from 'rebass';
// import MaterialInput from '@material-ui/core/Input';

export const Input = Styled(RebassInput)`
  width: ${({ width }) => width || '100%'};
  border: 1px solid #c5c5c5;
`;

Input.defaultProps = {
  p: 1,
  px: 2,
};
