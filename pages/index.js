import React from 'react';
import fetch from 'cross-fetch';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Flex, Box } from 'grid-styled';

import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';

import Wrap from '@styled/wrap';
import { Section, Cell, Primary, Secondary, Tertiary } from '@styled/list';
// import Card from '@styled/card';
// import Button from '@styled/button';
// import { Input } from '@styled/input';
import { Type } from '@styled/typography';

import { fetchNameOperations } from '@client/api';

class Home extends React.Component {
  static async getInitialProps() {
    const nameOperations = await fetchNameOperations();
    return {
      nameOperations,
    };
  }

  static propTypes = {
    nameOperations: PropTypes.array.isRequired,
  };

  nameOps() {
    return this.props.nameOperations.map((nameOp) => (
      <Link href={`/names/${nameOp.name}`} passHref key={nameOp.txid}>
        <Cell>
          <Tertiary>{nameOp.timeAgo}</Tertiary>
          <Primary>{nameOp.name}</Primary>
          <Secondary>Owned by {nameOp.address}</Secondary>
        </Cell>
      </Link>
    ));
  }

  render() {
    return (
      <Wrap>
        <Wrap.Inner>
          <Head title="Home" />
          <Nav />
          <Flex alignItems="row">
            <Box m={4} width={[1, 0.55]}>
              <Section>
                <Type.h2>Latest Names Registered</Type.h2>
                {this.nameOps()}
              </Section>
            </Box>
          </Flex>
          <Wrap.Push />
        </Wrap.Inner>
        <Footer />
      </Wrap>
    );
  }
}

export default Home;
