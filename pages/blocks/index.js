import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class BlocksPage extends React.Component {
  static async getInitialProps() {
    return {
      meta: {
        title: 'Blocks',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Blocks
      </Flex>
    );
  }
}

export default BlocksPage;
