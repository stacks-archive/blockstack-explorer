import React from 'react';
import { List } from '@components/list/index';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import { stacksValue } from '@common/lib/units';

const txTitle = (operation, tokensSent) => {
  if (operation === 'SENT') {
    return `Sent ${stacksValue(tokensSent)}`;
  }
  if (operation === 'RECEIVED') {
    return `Received ${stacksValue(tokensSent)}`;
  }
  return operation;
};

const StacksTxList = () => (
  <Consumer>
    {({ address }) => {
      if (!(address && address.history && address.history.length)) return null;
      return address.history.map(({ txid, operation, tokensSent }) => (
        <List.Item
          href={{
            pathname: '/transaction/single',
            query: {
              tx: txid,
            },
          }}
          as={`/tx/${txid}`}
          key={txid}
        >
          <Box maxWidth="calc(100% - 105px)">
            <List.Item.Title>{txTitle(operation, tokensSent)}</List.Item.Title>
            <List.Item.Subtitle overflow="auto">{txid}</List.Item.Subtitle>
          </Box>
        </List.Item>
      ));
    }}
  </Consumer>
);

export { StacksTxList };
