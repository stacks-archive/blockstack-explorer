import React from 'react';
import { fetchAddress } from '@common/lib/client/api';
import { AddressCard } from '@containers/cards/address';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { fetchTX } from '@common/lib/client/api';
import { Page } from '@components/page';

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
      <Page>
        <AddressCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} address={this.props.address} />
        <Page.Main>
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
        </Page.Main>
      </Page>
    );
  }
}

export default AddressSinglePage;
