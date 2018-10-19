import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class NamesPage extends React.Component {
  static async getInitialProps() {
    return {
      meta: {
        title: 'Names',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Names
      </Flex>
    );
  }
}

export default NamesPage;
