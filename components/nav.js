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
