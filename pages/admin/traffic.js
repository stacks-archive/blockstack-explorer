import React from 'react';
import { Flex, Box } from 'grid-styled';
import download from 'downloadjs';

import Head from '@components/head';
import Nav from '@components/nav';
import Wrap from '@styled/wrap';
import { Type } from '@styled/typography';
import Button from '@styled/button';

export default class AdminTraffic extends React.Component {
  downloadVisits = async () => {
    const res = await fetch('/admin/data/visits');
    const csv = await res.blob();
    download(csv, 'visits.csv');
  };

  downloadUnvisited = async () => {
    const res = await fetch('/admin/data/unvisited');
    const csv = await res.blob();
    download(csv, 'unvisited.csv');
  };

  render() {
    return (
      <Wrap>
        <Wrap.Inner>
          <Head title="Admin" />
          <Nav global />
          <Flex flexWrap="wrap" justifyContent="center">
            <Box width={1} pt={4} px={5}>
              <Type.h2 textAlign="center" mb={4}>
                Admin Dashboard
              </Type.h2>
              <Button display="block" mx="auto" onClick={this.downloadVisits}>
                <Type.span fontSize="18px" color="#fff">
                  Download Visited Addresses
                </Type.span>
              </Button>

              <Button display="block" mx="auto" mt={3} onClick={this.downloadUnvisited}>
                <Type.span fontSize="18px" color="#fff">
                  Download Unvisited Addresses
                </Type.span>
              </Button>
            </Box>
          </Flex>
        </Wrap.Inner>
      </Wrap>
    );
  }
}
