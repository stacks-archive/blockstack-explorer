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
  `,
};

const Title = {
  Link: Styled.a`
    color: white;
    text-decoration: none;
  `,
  Logo: Styled.div`
    float: left;
    svg {
      display: block;
      height: 36px;
      width: 36px;
    }
  `,
  LogoType: Styled.div`
    float: left;
    position: relative;
    top: 7px;
    margin-left: 5px;
    margin-right: 20px;
    svg {
      display: block;
      height: 24px;
      width: 142px;
    }
  `,
};

const Bar = Styled.header`
  background-color: rgb(32, 12, 43);
  color: white;
  width: 100%;
  flex-shrink: 0;
  flex-direction: column;
`;

Bar.Inner = Styled.div`
  min-height: 64px;
  padding: 10px 24px;
  color: white;
  a, a:visited {
    color: white;
    text-decoration: none;
    position: relative;
    text-transform: uppercase;
    font-weight: 600;
    top: 10px;
    margin-left: 15px;
    font-family: 'Plex', monospace;
  }
`;

const Nav = {
  Title,
  Search,
  Bar,
};

export default Nav;
