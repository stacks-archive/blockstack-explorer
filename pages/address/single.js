import React from 'react';
import { fetchAddress, fetchTX } from '@common/lib/client/api';
import { AddressCard } from '@containers/cards/address';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { Page } from '@components/page';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const address = req && req.params ? req.params.address : query.address;
    const data = query.data || (await fetchAddress(address));
    const transactions = [];
    if (data && data.transactions && data.transactions.length) {
      await Promise.all(
        data.transactions.map(async (_tx) => {
          const tx = await fetchTX(_tx);

          // Find our true value
          const vout = tx.vout.find(
            (v) =>
              v.scriptPubKey &&
              v.scriptPubKey.addresses &&
              v.scriptPubKey.addresses.length &&
              v.scriptPubKey.addresses.find((addr) => addr === address),
          );

          const modifiedTx = {
            ...tx,
            valueOut: vout && vout.value ? vout.value : tx.valueOut,
          };
          transactions.push(modifiedTx);
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
