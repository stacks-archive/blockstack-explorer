import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import StyledNav from '@styled/nav';
import { Type } from '@styled/typography';
import Logo from '@components/logo';

function Nav({ global }) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          {/* <AppBar position="static" colorPrimary={{ backgroundColor: 'rgb(32, 12, 43)' }}> */}
          <StyledNav.Bar>
            <Box width={[1, 3 / 4]} m="auto" textAlign="center">
              <StyledNav.Bar.Inner>
                <Link href="/app">
                  <Logo inverse/>
                </Link>
                {/* <StyledNav.Search.Input placeholder="search" onKeyUp={onEnter} /> */}
                {global && (
                  <Link href="/app/global">
                    <a>Global Stats</a>
                  </Link>
                )}
              </StyledNav.Bar.Inner>
            </Box>
          </StyledNav.Bar>
          
          {/* </AppBar> */}
        </Grid>
      </Grid>
    </div>
  );
}

Nav.propTypes = {
  global: PropTypes.bool,
};

Nav.defaultProps = {
  global: false,
};

export default Nav;
