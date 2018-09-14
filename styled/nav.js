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
    margin-top: 35px;
    svg {
      ${({ inverse }) => inverse && 'fill: #fff;'}
      ${({ inverse }) => inverse && 'margin-right: 10px;'}
      display: block;
      height: 36px;
      width: 36px;
    }
  `,
  LogoType: Styled.div`
    float: left;
    position: relative;
    top: 42px;
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
  line-height:100px;
`;

Bar.Inner = Styled.div`
  min-height: 100px;
  padding: 10px 0px;
  line-height:100px;
  color: white;
  a, a:visited {
    color: white;
    text-decoration: none;
    position: relative;
    text-transform: uppercase;
    font-weight: 600;
    margin-left: 20px;
    font-family: 'Plex', monospace;
  }
`;

const Nav = {
  Title,
  Search,
  Bar,
};

export default Nav;
