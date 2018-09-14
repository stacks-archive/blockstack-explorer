import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import PropTypes from 'prop-types';

import StyledNav from '@styled/nav';
import { Type } from '@styled/typography';

import { Logo, LogoType } from '@components/svgs';

function Nav({ global }) {
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          {/* <AppBar position="static" colorPrimary={{ backgroundColor: 'rgb(32, 12, 43)' }}> */}
          <StyledNav.Bar>
            <StyledNav.Bar.Inner>
              <Link href="/app">
                <StyledNav.Title.Link href="/app">
                  <StyledNav.Title.Logo>{Logo()}</StyledNav.Title.Logo>
                  <StyledNav.Title.LogoType>{LogoType()}</StyledNav.Title.LogoType>
                </StyledNav.Title.Link>
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
