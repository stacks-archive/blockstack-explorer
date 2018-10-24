import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { fetchBlock } from '@common/lib/client/api';
import { AddressCard } from '@components/address';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { fetchTX } from '@common/lib/client/api';
import { BlockCard } from '@components/block';

class BlocksSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const hash = req && req.params ? req.params.hash : query.hash;
    const data = query.data || (typeof hash !== 'undefined' && (await fetchBlock(hash)));
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
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <BlockCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} block={this.props.block} />
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          {this.props.nameOperations.length ? (
            <Card width={1} mb={[5, 5, 5]} title="Name Operations">
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

export default BlocksSinglePage;
