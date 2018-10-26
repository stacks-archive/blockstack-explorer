import React from 'react';
import NProgress from 'nprogress';
import { Flex, Button } from 'blockstack-ui';
import { AddressCard } from '@containers/cards/address';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { Page } from '@components/page';
import { fetchAddress } from '@common/lib/client/api';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const address = req && req.params ? req.params.address : query.address;
    const data = query.data || (await fetchAddress(address));
    const transactions = data.fullTransactions;
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

  constructor(props) {
    super(props);
    this.state = {
      loadedTxList: props.transactions,
      hasMoreTx: props.transactions.length < props.address.data.transactions.length,
      pageNum: 0,
    };
  }

  async loadMoreTransactions() {
    NProgress.start();
    let { loadedTxList, pageNum } = this.state;
    pageNum += 1;
    const { value, data } = this.props.address;
    const { fullTransactions } = await fetchAddress(value, pageNum);
    loadedTxList = loadedTxList.concat(fullTransactions);
    this.setState(
      {
        loadedTxList,
        pageNum,
        hasMoreTx: loadedTxList.length < data.transactions.length,
      },
      () => {
        NProgress.done();
      },
    );
  }

  render() {
    const { hasMoreTx, loadedTxList } = this.state;
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
              <TxList transactions={loadedTxList} />
              {hasMoreTx && (
                <Flex py={4} justifyContent="center">
                  <Button onClick={() => this.loadMoreTransactions()}>View More</Button>
                </Flex>
              )}
            </Card>
          ) : null}
        </Page.Main>
      </Page>
    );
  }
}

export default AddressSinglePage;
