import React from 'react';
import { List } from '@components/list/index';
import { Box, Flex, Type } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { Toggle } from 'react-powerplug';
import Link from 'next/link';
import { txTitle } from '@common/index';
import moment from 'moment';

const TXLink = ({ txid }) => (
  <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
    <Box minWidth="200px" pr={2}>
      BTC Transaction
    </Box>
    <Box maxWidth="100%" overflow="auto">
      <Link
        href={{
          pathname: '/transaction/single',
          query: {
            tx: txid,
          },
        }}
        as={`/tx/${txid}`}
        passHref
        prefetch={false}
      >
        <Type fontFamily="brand" is="a">
          {txid}
        </Type>
      </Link>
    </Box>
  </Flex>
);

const StacksTxList = () => (
  <Consumer>
    {({ address }) => {
      if (!(address && address.history && address.history.length)) return null;
      return address.history.map(({ txid, operation, valueStacks, ...historyEntry }) => (
        <Toggle key={txid}>
          {({ on, toggle }) => {
            const Icon = on ? ChevronUpIcon : ChevronDownIcon;
            return (
              <React.Fragment>
                <List.Item onClick={toggle}>
                  <Box maxWidth="calc(100% - 105px)">
                    <List.Item.Title>{txTitle(operation, valueStacks)}</List.Item.Title>
                    <List.Item.Subtitle overflow="auto">{txid}</List.Item.Subtitle>
                  </Box>
                  <Box>
                    <Flex opacity={0.5} alignItems="center" justifyContent="center" px={0} py={0} size={36}>
                      <Icon size={32} />
                    </Flex>
                  </Box>
                </List.Item>
                {on && (
                  <Box borderBottom={1} borderColor="blue.mid" color="blue.dark" bg="blue.light" py={4}>
                    <Box pt={4}>
                      {historyEntry.scratchData && (
                        <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                          <Box minWidth="200px" pr={2}>
                            Memo
                          </Box>
                          <Box maxWidth="100%" overflow="auto">
                            <Type fontFamily="brand">{historyEntry.scratchData}</Type>
                          </Box>
                        </Flex>
                      )}
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          Operation
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Type fontFamily="brand">{operation}</Type>
                        </Box>
                      </Flex>
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          Timestamp
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Type fontFamily="brand">
                            {moment.unix(historyEntry.blockTime).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                          </Type>
                        </Box>
                      </Flex>
                      {operation !== 'UNLOCK' && <TXLink txid={txid} />}
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          BTC Block
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Link
                            href={{
                              pathname: '/blocks/single',
                              query: { id: historyEntry.block_id },
                            }}
                            as={`/block/${historyEntry.block_id}`}
                            passHref
                            prefetch={false}
                          >
                            <Type fontFamily="brand" is="a">
                              {historyEntry.block_id}
                            </Type>
                          </Link>
                        </Box>
                      </Flex>
                      {historyEntry.sender && (
                        <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                          <Box minWidth="200px" pr={2}>
                            Sender
                          </Box>
                          <Box maxWidth="100%" overflow="auto">
                            <Link
                              href={{
                                pathname: '/address/stacks',
                                query: { address: historyEntry.sender },
                              }}
                              as={`/address/stacks/${historyEntry.sender}`}
                              passHref
                              prefetch={false}
                            >
                              <Type fontFamily="brand" is="a">
                                {historyEntry.sender}
                              </Type>
                            </Link>
                          </Box>
                        </Flex>
                      )}
                      {historyEntry.recipient && (
                        <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                          <Box minWidth="200px" pr={2}>
                            Recipient
                          </Box>
                          <Box maxWidth="100%" overflow="auto">
                            <Link
                              href={{
                                pathname: '/address/stacks',
                                query: { address: historyEntry.recipient },
                              }}
                              as={`/address/stacks/${historyEntry.recipient}`}
                              passHref
                              prefetch={false}
                            >
                              <Type fontFamily="brand" is="a">
                                {historyEntry.recipient}
                              </Type>
                            </Link>
                          </Box>
                        </Flex>
                      )}
                    </Box>
                  </Box>
                )}
              </React.Fragment>
            );
          }}
        </Toggle>
      ));
    }}
  </Consumer>
);

export { StacksTxList };
