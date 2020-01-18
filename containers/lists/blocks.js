import React from 'react';
import { Box, Type } from 'blockstack-ui';
import { List } from '@components/list';

const getResponsiveIndex = (array) => [...array.filter((item) => !item.display)];

const Cell = ({ ...rest }) => <Box color="blue.dark" px={4} py={3} {...rest} />;

const renderRowData = (data, keys) =>
  keys.map(({ key, value, ...props }) => (
    <Cell {...props} key={key}>
      <Type>{value ? value(data) : data[key] || '0'}</Type>
    </Cell>
  ));

const Row = ({ keys, ...data }) => (
  <List.Item
    href={{
      pathname: `/blocks/single`,
      query: {
        id: data.height,
      },
    }}
    passHref
    as={`/block/${data.height}`}
    is="a"
    borderBottom={1}
    fontSize="12px"
    borderColor="blue.mid"
    display="grid"
    gridTemplateColumns={[`repeat(${getResponsiveIndex(keys).length}, 1fr)`, `repeat(${keys.length}, 1fr)`]}
    py={1}
    className="block-list-row"
    data-block-height={data.height}
    px={0}
  >
    {renderRowData(data, keys)}
  </List.Item>
);

const Rows = ({ list, keys, showAll }) =>
  list.map((block, i) => {
    if (!showAll && i >= 200) return '';
    return <Row keys={keys} key={block.height} {...block} />;
  });

const TableHeader = ({ keys, ...rest }) => (
  <Box
    display="grid"
    gridTemplateColumns={[`repeat(${getResponsiveIndex(keys).length}, 1fr)`, `repeat(${keys.length}, 1fr)`]}
    borderBottom={1}
    borderColor="blue.mid"
    bg="#F1F6F9"
    position="sticky"
    zIndex={9999}
    top={[0, 0, 90]}
    {...rest}
  >
    {keys.map(({ label, value, ...props }, i) => (
      <Box px={4} py={3} key={i} flexGrow={1} {...props}>
        <Type color="blue.mid" fontSize="12px" textTransform="uppercase">
          {label}
        </Type>
      </Box>
    ))}
  </Box>
);

const BlocksList = ({ blocks, keys, showAll }) => (
  <>
    <TableHeader keys={keys} />
    <Box>
      <Rows keys={keys} list={blocks} showAll={showAll} />
    </Box>
  </>
);

export { BlocksList };
