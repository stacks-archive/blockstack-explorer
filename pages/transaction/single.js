import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';
import { fetchTX } from '@common/lib/client/api';

class TransactionSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const id = req && req.params ? req.params.tx : query.tx;
    const data = await fetchTX(id);
    return {
      tx: {
        id,
        ...data,
      },
      meta: {
        title: id,
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.tx.id}
        <pre>
          <code>{JSON.stringify(this.props.tx, null, 2)}</code>
        </pre>
      </Flex>
    );
  }
}

export default TransactionSinglePage;
