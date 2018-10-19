import React from 'react';
import Head from '@components/head';
import Nav from '@components/nav';

const Layout = ({ meta, children, ...rest }) => (
  <>
    {meta ? <Head {...meta} /> : null}
    <Nav />
    {children}
  </>
);

export { Layout };
