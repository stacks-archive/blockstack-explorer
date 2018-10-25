import React from 'react';
import { Flex, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchBlocks } from '@common/lib/client/api';
import { Time } from '@components/time';
import { BlocksList } from '@containers/lists/blocks';

const keys = [
  {
    label: 'Height',
    key: 'height',
  },
  {
    label: 'Timestamp',
    key: 'time',
    value: (data) => (data.time ? <Time date={data.time} /> : ''),
  },
  {
    label: 'Name Operations',
    key: 'nameOps',
    value: (data) => (data.nameOps && data.nameOps.length) || '0',
    display: ['none', 'block'],
  },
  {
    label: 'Transactions',
    key: 'txlength',
    display: ['none', 'block'],
  },
  {
    label: 'Mined By',
    key: 'poolInfo',
    value: (data) => (data.poolInfo && data.poolInfo.poolName ? data.poolInfo.poolName : ''),
    display: ['none', 'block'],
  },
  {
    label: 'Size',
    key: 'size',
  },
];

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
      <Flex p={5} flexDirection="column" width={1}>
        <Card
          title="Recent Blocks"
          actions={
            <Flex
              flexGrow={1}
              pt={[3, 0, 0]}
              width={[1, 'auto', 'auto']}
              alignItems={'center'}
              justifyContent={['flex-start', 'flex-end', 'flex-end']}
            >
              <Button size="small">Action 1</Button>
              <Button size="small">Action 2</Button>
              <Button size="small">Action 3</Button>
            </Flex>
          }
        >
          <BlocksList blocks={this.props.blocks} keys={keys} />
        </Card>
        <Flex py={4} justifyContent="center">
          <Button>View More Blocks</Button>
        </Flex>
      </Flex>
    );
  }
}

export default BlocksPage;
