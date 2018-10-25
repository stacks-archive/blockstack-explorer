import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';

const NamesList = ({ list, ...rest }) => (
  <Consumer>
    {({ nameOperations }) => {
      const array = list && list.length ? list : nameOperations;
      return array
        ? array.map(({ name, owner, address, timeAgo }) => (
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
              <Box>
                {name ? <List.Item.Title>{name}</List.Item.Title> : null}
                {address || owner ? <List.Item.Subtitle>Owned by {address || owner}</List.Item.Subtitle> : null}
              </Box>
              {timeAgo ? <List.Item.Subtitle>{timeAgo}</List.Item.Subtitle> : null}
            </List.Item>
          ))
        : null;
    }}
  </Consumer>
);

export { NamesList };
