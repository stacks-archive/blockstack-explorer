import Styled from 'styled-components';
import { Input as RebassInput } from 'rebass';
// import MaterialInput from '@material-ui/core/Input';

export const Input = Styled(RebassInput)`
  width: ${({ width }) => width || '100%'};
  padding: 18px 28px;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  font-size: 15px;
`;

Input.defaultProps = {
  p: 1,
  px: 2,
};
