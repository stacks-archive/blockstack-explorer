import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import { Flex, Box } from 'rebass';

import Head from '../components/head';
import Nav from '../components/nav';
import Footer from '../components/footer';

import { Card } from '../styled/card';
import { Input } from '../styled/input';
import { Type } from '../styled/typography';

const onEnter = (event) => {
  if (event.key === 'Enter') {
    const address = event.target.value;
    Router.push(`/app/address/${address}`);
  }
};

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <Flex alignItems="center">
      <Box width={[1, 3 / 4]} m="auto" mt={4} textAlign="center">
        <Card textAlign="center" p={10}>
          <Type.h1 my={3} fontWeight={500}>
            Welcome to the block explorer for the draft Stacks genesis block.
          </Type.h1>
          <Type.p fontSize={2} my={3}>
            Enter your Stacks address here.
          </Type.p>
          <Input my={3} placeholder="Enter a Stacks Address" autoFocus onKeyUp={onEnter} width="66%" />
        </Card>
      </Box>
    </Flex>
    <Footer />
  </div>
);

const mapStateToProps = () => ({
  // accounts: state.accounts.accountsByAddress,
});

export default connect(mapStateToProps)(Home);
