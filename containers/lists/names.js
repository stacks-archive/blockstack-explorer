import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';

const Subtitle = ({ owner }) => {
  if (!owner) return '';
  return <List.Item.Subtitle overflow="auto">{`Owned by ${owner}`}</List.Item.Subtitle>;
};

const NamesList = ({ list, ...rest }) => (
  <Consumer>
    {({ nameOperations }) => {
      const array = list && list.length ? list : nameOperations;
      if (!array) return '';
      return array.map(({ name, owner, address, timeAgo }) => (
        <List.Item
          href={{
            pathname: '/names/single',
            query: {
              name,
            },
          }}
          as={`/name/${name}`}
          key={name}
        >
          <Box maxWidth="100%">
            {name ? <List.Item.Title overflow="auto">{name}</List.Item.Title> : null}
            {address || owner ? <Subtitle owner={`Owned by ${address || owner}`} /> : null}
          </Box>
          {timeAgo ? <List.Item.Subtitle>{timeAgo}</List.Item.Subtitle> : null}
        </List.Item>
      ));
    }}
  </Consumer>
);

export { NamesList };
