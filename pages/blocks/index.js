import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

import { fetchBlocks } from '@client/api';

class BlocksPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const date = req && req.params ? req.params.date : query.date;
    const blocks = await fetchBlocks(date);
    return {
      blocks,
      meta: {
        title: 'Blocks',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Blocks
        <Flex>
          <pre>
            <code>{JSON.stringify(this.props.blocks, null, 2)}</code>
          </pre>
        </Flex>
      </Flex>
    );
  }
}

export default BlocksPage;
