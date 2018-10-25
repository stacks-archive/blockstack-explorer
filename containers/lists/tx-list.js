import React from 'react';
import { List } from '@components/list/index';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import { Time } from '@components/time';

const TxList = ({ ...rest }) => (
  <Consumer>
    {({ transactions }) =>
      transactions
        ? transactions.map(({ txid, valueOut, time }) => (
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
              <Box maxWidth={'calc(100% - 105px)'}>
                <List.Item.Title overflow="auto">Sent {valueOut} BTC</List.Item.Title>
                <List.Item.Subtitle overflow="auto">{txid}</List.Item.Subtitle>
              </Box>
              {time ? (
                <List.Item.Subtitle>
                  <Time date={time} />
                </List.Item.Subtitle>
              ) : null}
            </List.Item>
          ))
        : null
    }
  </Consumer>
);

export { TxList };
