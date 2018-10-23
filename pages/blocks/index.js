import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchBlocks } from '@client/api';
import Link from 'next/link';
const keys = [
  {
    label: 'Height',
    key: 'height',
  },
  {
    label: 'Timestamp',
    key: 'time',
    display: ['none', 'block'],
  },
  {
    label: 'Name Operations',
    key: 'nameOps',
    value: (data) => data.nameOps && data.nameOps.length,
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

const Cell = ({ ...rest }) => <Box color="blue.dark" px={4} py={3} {...rest} />;

const renderRowData = (data, keys) =>
  keys.map(({ key, value, ...props }) => (
    <Cell {...props}>
      <Type>{String(value ? value(data) : data[key])}</Type>
    </Cell>
  ));
const Block = (data) => (
  <Link
    href={{
      pathname: `/blocks/single`,
      query: {
        hash: data.height,
      },
    }}
    passHref
    as={`/blocks/${data.height}`}
  >
    <Box
      is="a"
      borderBottom={1}
      fontSize="12px"
      borderColor="blue.mid"
      display={'grid'}
      gridTemplateColumns="repeat(6, 1fr)"
    >
      {renderRowData(data, keys)}
    </Box>
  </Link>
);

const Blocks = ({ list, ...rest }) => list.map((block, i) => (i < 20 ? <Block {...block} /> : null));

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
            <Flex>
              <Box>Action 1</Box>
              <Box>Action 2</Box>
              <Box>Action 3</Box>
            </Flex>
          }
        >
          <Box
            display={'grid'}
            gridTemplateColumns="repeat(6, 1fr)"
            borderBottom={1}
            borderColor="blue.mid"
            bg="#F1F6F9"
            position={'sticky'}
            top={[0, 0, 90]}
          >
            {keys.map(({ label, value, ...props }, i) => (
              <Box px={4} py={3} flexGrow={1} {...props}>
                <Type color={'blue.mid'} fontSize={'12px'} textTransform="uppercase">
                  {label}
                </Type>
              </Box>
            ))}
          </Box>
          <Box>
            <Blocks list={this.props.blocks} />
          </Box>
        </Card>
        <Flex py={4} justifyContent="center">
          <Button>View More Blocks</Button>
        </Flex>
      </Flex>
    );
  }
}

export default BlocksPage;
