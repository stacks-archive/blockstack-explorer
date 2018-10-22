import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class AddressesPage extends React.Component {
  static async getInitialProps() {
    return {
      meta: {
        title: 'Addresses',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Addresses
      </Flex>
    );
  }
}

export default AddressesPage;
