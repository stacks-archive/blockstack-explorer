import React from 'react';
import { Flex } from 'blockstack-ui';
import { Navigation } from '@components/navigation';
import { Search } from '@components/search';
import { Logo } from '@components/logo/index';

const HeaderBar = ({ ...rest }) => (
  <Flex
    alignItems="center"
    backgroundRepeat="no-repeat"
    position="fixed"
    width={1}
    zIndex={999}
    bg="blue.dark"
    pr={[0, 0, 5]}
    flexDirection={['column', 'column', 'row']}
    {...rest}
  />
);

const Header = ({ ...rest }) => (
  <HeaderBar {...rest}>
    <Flex alignItems={'center'} width={[1, 1, 'auto']} flexDirection={['column', 'column', 'row']} flexGrow={1}>
      <Logo />
      <Search />
    </Flex>
    <Navigation />
  </HeaderBar>
);

export { Header };
