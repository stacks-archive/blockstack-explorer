import React from 'react';
import { fetchBlockV2 } from '@common/lib/client/api';
import { NameOperationsList } from '@containers/lists/single-name-operations';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { BlockCard } from '@containers/cards/block';
import { Page } from '@components/page';

class BlocksSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const hash = req && req.params ? req.params.hash : query.hash;
    const data = query.data || (await fetchBlockV2(hash)).block;
    const transactions = data.transactions && data.transactions.length ? data.transactions : [];
    const nameOperations = data.nameOperations && data.nameOperations.length ? data.nameOperations : [];
    return {
      block: {
        hash,
        ...data,
      },
      transactions,
      nameOperations,
      meta: {
        title: `Block ${data && data.height}`,
      },
    };
  }

  render() {
    const { block, nameOperations, transactions } = this.props;
    return (
      <Page>
        <BlockCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} block={block} />
        <Page.Main>
          {nameOperations.length ? (
            <Card width={1} mb={[5, 5, 5]} title="Name Operations">
              <NameOperationsList items={nameOperations} />
            </Card>
          ) : null}
          {transactions.length ? (
            <Card width={1} mb={[5, 5, 0]} title="Transactions">
              <TxList />
            </Card>
          ) : null}
        </Page.Main>
      </Page>
    );
  }
}

export default BlocksSinglePage;
