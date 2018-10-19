import React from 'react';
import Link from 'next/link';
import { SearchIcon } from 'mdi-react';
import { Flex, Box, Type, Input } from 'blockstack-ui';

const Header = ({ ...rest }) => (
  <Flex
    alignItems="center"
    backgroundImage="url(/static/assets/background.svg)"
    backgroundRepeat="no-repeat"
    bg="blue.dark"
    pr={5}
    flexDirection={['column', 'column', 'row']}
    {...rest}
  />
);

const Logo = ({ ...rest }) => (
  <Box display={['block', 'block', 'none', 'block']} style={{ flexShrink: 0 }} pl={5} py={5} {...rest}>
    <Link href="/">
      <Box is="a">
        <Type
          fontWeight="bold"
          color="white"
          letterSpacing={1.25}
          fontSize={3}
          style={{
            textTransform: 'uppercase',
          }}
        >
          Explorer
        </Type>
      </Box>
    </Link>
  </Box>
);

const Search = ({ ...rest }) => (
  <Box position={'relative'} width={[1, 0.5, '500px']} px={[4]} {...rest}>
    <Flex
      right={'20px'}
      color="blue.dark"
      alignItems={'center'}
      justifyContent={'center'}
      position="absolute"
      height="100%"
      px={3}
      opacity={0.45}
    >
      <SearchIcon />
    </Flex>
    <Input
      minWidth={'100%'}
      type="text"
      placeholder="Find address, block, name or transaction by ID"
      spellCheck="false"
    />
  </Box>
);

const items = [
  { path: '/addresses', label: 'Addresses' },
  { path: '/blocks', label: 'Blocks' },
  { path: '/names', label: 'Names' },
  { path: '/transactions', label: 'Transactions' },
];

const Navigation = ({ ...rest }) => (
  <Flex {...rest} py={5}>
    {items.map(({ label, path }, i) => (
      <Link key={i} passHref href={path}>
        <Type px={4} is="a" color="blue.mid">
          {label}
        </Type>
      </Link>
    ))}
  </Flex>
);

const NavBar = ({ ...rest }) => (
  <Header {...rest}>
    <Flex alignItems={'center'}>
      <Logo />
      <Search />
    </Flex>
    <Navigation />
  </Header>
);

export default NavBar;
