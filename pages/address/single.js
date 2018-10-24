import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { fetchAddress } from '@common/lib/client/api';
import { AddressCard } from '@components/address';
import { NamesList } from '@containers/lists/names';
import { Card } from '@components/card';
import { fetchTX } from '@common/lib/client/api';
import { TxList } from '@components/transactions';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const address = req && req.params ? req.params.address : query.address;
    const data = await fetchAddress(address);
    let transactions = [];
    if (data.transactions && data.transactions.length) {
      await Promise.all(
        data.transactions.map(async (_tx) => {
          const tx = await fetchTX(_tx);
          transactions.push(tx);
        }),
      );
    }
    return {
      address: {
        value: address,
        data,
      },
      transactions,
      nameOperations:
        data.names && data.names.length
          ? data.names.map((name) => ({
              name,
              address,
            }))
          : [],
      meta: {
        title: `Address: ${address}`,
      },
    };
  }

  render() {
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <AddressCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} address={this.props.address} />
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          {this.props.nameOperations.length ? (
            <Card width={1} mb={[5, 5, 5]} title="Names Owned">
              <NamesList />
            </Card>
          ) : null}
          {this.props.transactions.length ? (
            <Card width={1} mb={[5, 5, 0]} title="Transactions">
              <TxList />
            </Card>
          ) : null}
        </Box>
      </Flex>
    );
  }
}

export default AddressSinglePage;
