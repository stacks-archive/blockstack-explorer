import React from 'react';
import Head from '@components/head';
import { Header } from '@components/header';
import { Flex } from 'blockstack-ui';

const Layout = ({ meta, children, ...rest }) => (
  <>
    {meta ? <Head {...meta} /> : null}
    <Header />
    <Flex flexDirection="column">
      <Header
        opacity={0}
        position="static"
        style={{
          pointerEvents: 'none',
        }}
      />
      <Flex position="relative" flexDirection="column">
        {children}
      </Flex>
    </Flex>
  </>
);

export { Layout };
