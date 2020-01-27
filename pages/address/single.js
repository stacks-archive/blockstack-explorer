import React from 'react';
import NProgress from 'nprogress';
import { Flex, Button, Type } from 'blockstack-ui';
import { AddressCard } from '@containers/cards/address';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { Page } from '@components/page';
import { fetchAddress } from '@common/lib/client/api';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ res, query }) {
    const { address } = query;
    const data = await fetchAddress(address);
    const historyExists =
      data && ((data.transactions && data.transactions.length > 0) || (data.names && data.names.length > 0));
    if (!historyExists && res) {
      res.statusCode = 404;
    }
    return {
      historyExists,
      address: {
        value: address,
        data,
      },
      totalTransactionsCount: data.totalTransactionsCount,
      transactions: data.transactions,
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
      hasMoreTx: props.transactions.length < props.totalTransactionsCount,
      pageNum: 0,
    };
  }

  async loadMoreTransactions() {
    NProgress.start();
    let { loadedTxList, pageNum } = this.state;
    pageNum += 1;
    const { value } = this.props.address;
    const { totalTransactionsCount } = this.props;
    const { transactions } = await fetchAddress(value, pageNum);
    loadedTxList = loadedTxList.concat(transactions);
    this.setState(
      {
        loadedTxList,
        pageNum,
        hasMoreTx: loadedTxList.length < totalTransactionsCount,
      },
      () => {
        NProgress.done();
      },
    );
  }

  render() {
    const { historyExists, address } = this.props;
    if (!historyExists) {
      return (
        <Page key={address.value}>
          <Page.Main>
            <Card py={8} textAlign="center">
              <Type>
                No history was found for address
                <Type fontWeight="bold" ml={1}>
                  {address.value}
                </Type>
              </Type>
            </Card>
          </Page.Main>
        </Page>
      );
    }
    const { hasMoreTx, loadedTxList } = this.state;
    return (
      <Page>
        <AddressCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} address={address} />
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
