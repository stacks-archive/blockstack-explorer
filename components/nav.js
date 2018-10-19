import React from 'react';
import Link from 'next/link';
import StyledNav from '@styled/nav';

export default class Nav extends React.Component {
  render() {
    return (
      <StyledNav.Header>
        <StyledNav.LogoWrapper>
          <Link href="/">
            <a>
              <span>STAX</span>
              <span>Explorer</span>
            </a>
          </Link>
        </StyledNav.LogoWrapper>
        <div>
          <StyledNav.Search.Icon src="/static/assets/search.svg" />
          <StyledNav.Search.Input
            type="text"
            placeholder="Find address, block, name or transaction by ID"
            spellcheck="false"
          />
        </div>
        <StyledNav.Navigation.Nav>
          <StyledNav.Navigation.Ul>
            <StyledNav.Navigation.Li>
              <Link passHref href="/addresses">
                <StyledNav.Navigation.a>Addresses</StyledNav.Navigation.a>
              </Link>
            </StyledNav.Navigation.Li>
            <StyledNav.Navigation.Li>
              <Link passHref href="/blocks">
                <StyledNav.Navigation.a>Blocks</StyledNav.Navigation.a>
              </Link>
            </StyledNav.Navigation.Li>
            <StyledNav.Navigation.Li>
              <Link passHref href="/names">
                <StyledNav.Navigation.a>Names</StyledNav.Navigation.a>
              </Link>
            </StyledNav.Navigation.Li>
            <StyledNav.Navigation.Li>
              <Link passHref href="/transactions">
                <StyledNav.Navigation.a>Transactions</StyledNav.Navigation.a>
              </Link>
            </StyledNav.Navigation.Li>
          </StyledNav.Navigation.Ul>
        </StyledNav.Navigation.Nav>
      </StyledNav.Header>
    );
  }
}

// function Nav({ global }) {
// return (
//   <header>
//     <Grid container>
//       <Grid item xs={12}>
//         {/* <AppBar position="static" colorPrimary={{ backgroundColor: 'rgb(32, 12, 43)' }}> */}
//         <StyledNav.Bar>
//           <Box width={[1, 3 / 4]} m="auto" textAlign="center">
//             <StyledNav.Bar.Inner>
//               <Link href="/app">
//                 <Logo inverse/>
//               </Link>
//               {/* <StyledNav.Search.Input placeholder="search" onKeyUp={onEnter} /> */}
//               {global && (
//                 <Link href="/app/global">
//                   <a>Global Stats</a>
//                 </Link>
//               )}
//             </StyledNav.Bar.Inner>
//           </Box>
//         </StyledNav.Bar>

//         {/* </AppBar> */}
//       </Grid>
//     </Grid>
//   </header>
// );
// }

// Nav.propTypes = {
//   global: PropTypes.bool,
// };

// Nav.defaultProps = {
//   global: false,
// };

// export default Nav;
