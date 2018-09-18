import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

import { Flex, Box } from 'grid-styled';

import Head from '@components/head';
import Nav from '@components/nav';
import Footer from '@components/footer';

import Wrap from '@styled/wrap';
import Card from '@styled/card';
import Button from '@styled/button';
import { Input } from '@styled/input';
import { Type } from '@styled/typography';

class Home extends React.Component {
// const Home = () => (

  state = {
    address: "",
  };

  onEnter(event) {
    if (event.key === 'Enter') {
      this.submit()
    }
  }

  onChange(event) {
    this.setState({
      address: event.target.value
    })
  }

  submit() {
    const { address } = this.state;
    Router.push(`/app/address/${address.trim()}`);
  }

  render() {
    return (
      <Wrap>
        <Wrap.Inner>
          <Head title="Home" />
          <Nav />
          <Flex alignItems="center">
            <Box width={[1, 3 / 4]} m="auto" mt={6} mb={4} textAlign="center">
              <Card textAlign="center" p={10}>
                <Card.HeaderBig>
                  <Type.h2 my={3} fontWeight={500} color="#fff">
                    Welcome to the block explorer for <br/>the draft Stacks Genesis Block.
                  </Type.h2>
                </Card.HeaderBig>
                <Card.Content>
                  <Type.p fontSize={3} my={3}>
                    Enter your Stacks address below to look up your allocation
                  </Type.p>
                  <Input my={3} 
                    value={this.state.address} 
                    placeholder="eg. SPNN289GPP5HQA5ZF2FKQKJM3K2MPNPDD6QYA2J5" 
                    autoFocus 
                    onKeyUp={(evt) => this.onEnter(evt)} 
                    onChange={(evt) => this.setState({ address: evt.target.value })} 
                    width="66%" />
                  <Button onClick={() => this.submit()}>Submit</Button>
                  <Type.p mt={3} mb={1} fontSize={1}>
                    If you submitted your wallet through CoinList, please make sure your
                    <br/>
                    public address matches the one listed on your CoinList dashboard.
                  </Type.p>
                  <Type.p mt={1} mb={3} fontSize={1}>
                    New versions of the genesis block are published roughly every 24 hours. 
                    <br/>
                    If you recently submitted an address or edits, please check back tomorrow.
                  </Type.p>
                </Card.Content>
              </Card>
            </Box>
          </Flex>
          <Wrap.Push></Wrap.Push>
        </Wrap.Inner>
        <Footer />
      </Wrap>
    )
  }

}

export default Home;
