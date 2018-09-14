import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import PropTypes from 'prop-types';

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
            <StyledNav.Bar.Inner>
              <Link href="/app">
                <Logo />
              </Link>
              {/* <StyledNav.Search.Input placeholder="search" onKeyUp={onEnter} /> */}
              {global && (
                <Link href="/app/global">
                  <a>Global Stats</a>
                </Link>
              )}
            </StyledNav.Bar.Inner>
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
