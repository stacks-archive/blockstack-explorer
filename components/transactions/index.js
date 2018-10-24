import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
const TxList = ({ ...rest }) => (
  <Consumer>
    {({ transactions }) =>
      transactions
        ? transactions.map(({ txid, time }) => (
            <List.Item key={txid}>
              <Box>
                <List.Item.Title>{txid}</List.Item.Title>
              </Box>
              {time ? <List.Item.Subtitle>{time}</List.Item.Subtitle> : null}
            </List.Item>
          ))
        : null
    }
  </Consumer>
);

export { TxList };
