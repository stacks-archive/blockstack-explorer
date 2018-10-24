import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';

const NamesList = ({ ...rest }) => (
  <Consumer>
    {({ nameOperations }) =>
      nameOperations
        ? nameOperations.map(({ name, address, timeAgo }) => (
            <List.Item
              href={{
                pathname: '/names/single',
                query: {
                  name,
                },
              }}
              as={`/names/${name}`}
              key={name}
            >
              <Box>
                <List.Item.Title>{name}</List.Item.Title>
                {address ? <List.Item.Subtitle>Owned by {address}</List.Item.Subtitle> : null}
              </Box>
              {timeAgo ? <List.Item.Subtitle>{timeAgo}</List.Item.Subtitle> : null}
            </List.Item>
          ))
        : null
    }
  </Consumer>
);

export { NamesList };
