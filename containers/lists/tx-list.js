import React from 'react';
import { List } from '@components/list/index';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import moment from 'moment'
const TxList = ({ ...rest }) => (
  <Consumer>
    {({ transactions }) =>
      transactions
        ? transactions.map(({ txid, time }) => (
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
                <List.Item.Title overflow="auto">{txid}</List.Item.Title>
              </Box>
              {time ? <List.Item.Subtitle>{moment(new Date(time * 1000)).format('DD MMM YYYY HH:MM')}</List.Item.Subtitle> : null}
            </List.Item>
          ))
        : null
    }
  </Consumer>
);

export { TxList };
