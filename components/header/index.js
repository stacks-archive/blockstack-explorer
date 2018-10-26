import React from 'react';
import { Flex } from 'blockstack-ui';
import { Navigation } from '@components/navigation';
import { Search } from '@components/search';
import { Logo } from '@components/logo/index';

const HeaderBar = ({ ...rest }) => (
  <Flex
    alignItems="center"
    backgroundRepeat="no-repeat"
    position={['static', 'static', 'fixed']}
    width={1}
    zIndex={999999}
    bg="blue.dark"
    height={['auto', 'auto', 90]}
    pr={[0, 0, 5]}
    flexDirection={['column', 'column', 'row']}
    {...rest}
  />
);

const Header = ({ ...rest }) => (
  <HeaderBar {...rest}>
    <Flex
      alignItems={'center'}
      width={[1, 1, 'auto']}
      flexDirection={['column', 'column', 'row']}
      pb={[5, 5, 0]}
      flexGrow={1}
    >
      <Flex px={[5, 5, 0]} width={[1, 1, 'auto']} alignItems="center" justifyContent="space-between">
        <Logo />
        <Navigation display={['flex', 'flex', 'none']} />
      </Flex>
      <Search />
    </Flex>
    <Navigation display={['none', 'none', 'flex']} />
  </HeaderBar>
);

export { Header };
