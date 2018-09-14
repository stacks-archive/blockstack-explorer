import React from 'react';

import StyledNav from '@styled/nav';
import { Logo as LogoIcon, LogoType } from '@components/svgs';

const Logo = () => (
  <StyledNav.Title.Link href="/app">
    <StyledNav.Title.Logo>{LogoIcon()}</StyledNav.Title.Logo>
    <StyledNav.Title.LogoType>{LogoType()}</StyledNav.Title.LogoType>
  </StyledNav.Title.Link>
);

export default Logo;
