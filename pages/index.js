import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import { Flex, Box, Text } from 'rebass';

import Head from '../components/head';
import Nav from '../components/nav';

import { Card } from '../styled/card';
import { Input } from '../styled/input';

const onEnter = (event) => {
  if (event.key === 'Enter') {
    const address = event.target.value;
    Router.push(`/address/${address}`);
  }
};

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <Flex alignItems="center">
      <Box width={[1, 3 / 4]} m="auto" mt={4} textAlign="center">
        <Card textAlign="center" p={10}>
          <Text fontSize={4} my={3}>
            Welcome to the Stacks genesis block explorer
          </Text>
          <Text fontSize={2} my={3}>
            Enter an address to view details.
          </Text>
          <Input my={3} placeholder="Enter a Stacks Address" autoFocus onKeyUp={onEnter} />
        </Card>
      </Box>
    </Flex>
  </div>
);

const mapStateToProps = () => ({
  // accounts: state.accounts.accountsByAddress,
});

export default connect(mapStateToProps)(Home);
