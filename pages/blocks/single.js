import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';
import { fetchBlock } from '@client/api';

class BlockSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const hash = req && req.params ? req.params.hash : query.hash;
    const data = query.data || (typeof hash !== 'undefined' && (await fetchBlock(hash)));
    return {
      block: {
        hash,
        ...data,
      },
      meta: {
        title: `Block ${data && data.height}`,
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.block.height}
        <Flex>
          <pre>
            <code>{JSON.stringify(this.props.block, null, 2)}</code>
          </pre>
        </Flex>
      </Flex>
    );
  }
}

export default BlockSinglePage;
