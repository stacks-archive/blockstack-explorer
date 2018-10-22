import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class TransactionsPage extends React.Component {
  static async getInitialProps() {
    return {
      meta: {
        title: 'Transactions',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Transactions
      </Flex>
    );
  }
}

export default TransactionsPage;
