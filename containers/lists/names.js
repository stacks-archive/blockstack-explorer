import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';

const NamesList = ({ ...rest }) => (
  <Consumer>
    {({ nameOperations }) =>
      nameOperations
        ? nameOperations.map((nameOp) => (
            <List.Item
              href={{
                pathname: '/names/single',
                query: {
                  name: nameOp.name,
                },
              }}
              passHref
              as={`/names/${nameOp.name}`}
              key={nameOp.txid}
            >
              <Box>
                <List.Item.Title>{nameOp.name}</List.Item.Title>
                <List.Item.Subtitle>Owned by {nameOp.address}</List.Item.Subtitle>
              </Box>
              <List.Item.Subtitle>{nameOp.timeAgo}</List.Item.Subtitle>
            </List.Item>
          ))
        : null
    }
  </Consumer>
);

export { NamesList };
