import Styled from 'styled-components';
// import { Input as RebassInput } from 'rebass';
import MaterialInput from '@material-ui/core/Input';

export const Input = Styled(MaterialInput)`
  width: ${({ width }) => width || '100%'};
`;
