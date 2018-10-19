import Styled from 'styled-components';
import Input from '@material-ui/core/Input';

const Nav = {
  Header: Styled.header`
    padding: 1em;
    flex-wrap: nowrap;
    display: flex;
    align-content: stretch;
    background: url(/static/assets/background.svg) #211F6D no-repeat 0 0;
    position: relative;

    div {
      position: relative;
      width: 100%;
    }
  `,
  LogoWrapper: Styled.div`
    margin-left: 2em;
    width: auto !important;
    color: white;
    cursor: default;
    font-family: "Futura Heavy";
    font-size: 2em;
    line-height: 1em;
    text-align: center;
    text-transform: uppercase;

    a {
      color: white;
      display: block;
      padding: 0.5em 1em;
      text-decoration: none;
    }

    span {
      display: block;
      line-height: 1em;
      &:nth-of-type(2) {
        font-size: 0.5em;
        font-weight: 300;
      }
    }
  `,
  Search: {
    Icon: Styled.img`
      height: 100%;
      position: absolute;
      left: 1.5em;
      top: 0;
      width: 1.5em;
    `,
    Input: Styled.input`
      border-radius: 6px;
      width: 37em;
      background: #1A1959;
      border: 1px solid #2F2C88;
      // border-radius: 0;
      // border-box: 100%;
      color: white;
      height: 100%;
      padding: 1.5em 1.5em 1.5em 4em;
      // width: 100%;
      box-sizing: border-box;
      display: block;
      font-size: inherit;
      outline: none;
      transition: background 0.2s;
      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    `,
  },
  Navigation: {
    Nav: Styled.nav`
      overflow-x: auto;
      width: 100%;
      margin-left: 32px;
    `,
    Ul: Styled.ul`
      display: flex;
      list-style: none;
      height: 100%;
      margin: 0;
      padding: 0;
    `,
    Li: Styled.li`
      color: white;
      cursor: default;
      height: 100%;
      margin: 0 8px;
    `,
    a: Styled.a`
      box-sizing: border-box;
      color: #7F7DBC;
      display: block;
      height: 100%;
      text-align: center;
      padding: 32px 24px;
    `,
  },
};

export default Nav;

// const Search = {
//   Input: Styled(Input)`
//     margin-right: 20px;
//     margin-left: 100px;
//     input {
//       color: white;
//     }
//     &:before {
//       border-bottom: 1px solid rgba(255, 255, 255, 0.4) !important;
//     }
//   `,
// };

// const Title = {
//   Link: Styled.a`
//     color: white;
//     text-decoration: none;
//   `,
//   Logo: Styled.div`
//     float: left;
//     margin-top: 35px;
//     svg {
//       ${({ inverse }) => inverse && 'fill: #fff;'}
//       ${({ inverse }) => inverse && 'margin-right: 10px;'}
//       display: block;
//       height: 36px;
//       width: 36px;
//     }
//   `,
//   LogoType: Styled.div`
//     float: left;
//     position: relative;
//     top: 42px;
//     margin-left: 5px;
//     margin-right: 20px;
//     svg {
//       display: block;
//       height: 24px;
//       width: 142px;
//     }
//   `,
// };

// const Bar = Styled.header`
//   background-color: rgb(32, 12, 43);
//   color: white;
//   width: 100%;
//   flex-shrink: 0;
//   flex-direction: column;
//   line-height:100px;
// `;

// Bar.Inner = Styled.div`
//   min-height: 100px;
//   padding: 10px 0px;
//   line-height:100px;
//   color: white;
//   a, a:visited {
//     color: white;
//     text-decoration: none;
//     position: relative;
//     text-transform: uppercase;
//     font-weight: 600;
//     margin-left: 20px;
//     font-family: 'Plex', monospace;
//   }
// `;

// const Nav = {
//   Title,
//   Search,
//   Bar,
// };

// export default Nav;
