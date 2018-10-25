import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { List } from '@components/list';
import { fetchBlocks } from '@common/lib/client/api';

const SecondaryButton = ({ ...rest }) => (
  <Button
    height="auto"
    py={1}
    px={3}
    typeProps={{
      fontSize: '12px',
      fontWeight: 500,
    }}
    bg="transparent"
    color="blue.dark"
    borderColor="blue.mid"
    boxShadow="none"
    border="1px solid"
    flexGrow={[1, 0, 0]}
    ml={[0, 2, 2]}
    mr={[2, 0, 0]}
    {...rest}
  />
);
const keys = [
  {
    label: 'Height',
    key: 'height',
  },
  {
    label: 'Timestamp',
    key: 'time',
  },
  {
    label: 'Name Operations',
    key: 'nameOperations',
    value: (data) => data.nameOperations && data.nameOperations.length,
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

const getResponsiveIndex = (array) => [...array.filter((item) => !item.display)];

const Cell = ({ ...rest }) => <Box color="blue.dark" px={4} py={3} {...rest} />;

const renderRowData = (data, keys) =>
  keys.map(({ key, value, ...props }) => (
    <Cell {...props}>
      <Type>{String(value ? value(data) : data[key])}</Type>
    </Cell>
  ));
const Block = (data) => (
  <List.Item
    href={{
      pathname: `/blocks/single`,
      query: {
        hash: data.height,
      },
    }}
    passHref
    as={`/blocks/${data.height}`}
    is="a"
    borderBottom={1}
    fontSize="12px"
    borderColor="blue.mid"
    display="grid"
    gridTemplateColumns={[`repeat(${getResponsiveIndex(keys).length}, 1fr)`, `repeat(${keys.length}, 1fr)`]}
    py={1}
    px={0}
  >
    {renderRowData(data, keys)}
  </List.Item>
);

const Blocks = ({ list, ...rest }) => list.map((block, i) => (i < 200 ? <Block {...block} /> : null));

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
          actions={(
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
)}
        >
          <Box
            display="grid"
            gridTemplateColumns={[`repeat(${getResponsiveIndex(keys).length}, 1fr)`, `repeat(${keys.length}, 1fr)`]}
            borderBottom={1}
            borderColor="blue.mid"
            bg="#F1F6F9"
            position="sticky"
            zIndex={9999}
            top={[0, 0, 90]}
          >
            {keys.map(({ label, value, ...props }, i) => (
              <Box px={4} py={3} flexGrow={1} {...props}>
                <Type color="blue.mid" fontSize="12px" textTransform="uppercase">
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
