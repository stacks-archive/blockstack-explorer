import Styled from 'styled-components';
import Input from '@material-ui/core/Input';

const Search = {
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

const Title = {
  Link: Styled.a`
    color: white;
    text-decoration: none;
  `
}

const Nav = {
  Title,
  Search,
}

export default Nav;