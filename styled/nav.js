import Styled from 'styled-components';
import Input from '@material-ui/core/Input';

export const Search = {
  Input: Styled(Input)`
    margin-right: 20px;
    margin-left: 100px;
    input {
      color: white;
    }
    &:before {
      border-bottom: 1px solid rgba(255, 255, 255, 0.4) !important;
    }
  `
}