import React from 'react';
import PropTypes from 'prop-types';

import StyledNav from '@styled/nav';
import { Logo as LogoIcon, LogoType, LogoWhite } from '@components/svgs';

const Logo = ({ inverse }) => (
  <StyledNav.Title.Link href="/app">
    <StyledNav.Title.Logo inverse={inverse}>{inverse ? LogoWhite() : LogoIcon()}</StyledNav.Title.Logo>
    <StyledNav.Title.LogoType>{LogoType()}</StyledNav.Title.LogoType>
  </StyledNav.Title.Link>
);

Logo.propTypes = {
  inverse: PropTypes.bool,
};

Logo.defaultProps = {
  inverse: false,
};

export default Logo;
