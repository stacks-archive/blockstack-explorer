import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class NamesPage extends React.Component {
  static async getInitialProps({ req, query, ...rest }) {
    return {
      meta: {
        title: 'Names',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        all names
      </Flex>
    );
  }
}

export default NamesPage;
