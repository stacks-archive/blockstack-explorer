import React from 'react';
import Head from '@components/head';
import { Header } from '@components/header';
import { Flex } from 'blockstack-ui';
import { Footer } from '@components/footer';

const Layout = ({ meta, children, ...rest }) => (
  <>
    {meta ? <Head {...meta} /> : null}
    <Header />
    <Flex flexGrow={1} flexDirection="column">
      <Header
        opacity={0}
        display={['none', 'none', 'block']}
        position="static"
        style={{
          pointerEvents: 'none',
        }}
      />
      <Flex flexGrow={1} position="relative" flexDirection="column">
        {children}
      </Flex>
      <Footer />
    </Flex>
  </>
);

export { Layout };
