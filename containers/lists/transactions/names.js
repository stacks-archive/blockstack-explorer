import React from 'react';
import Link from 'next/link';
import { Flex, Box, Type } from 'blockstack-ui';
import { Toggle } from 'react-powerplug';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import moment from 'moment';
import { Card } from '@components/card';
import { List } from '@components/list';

const NamesList = ({ names }) => (
  <Card width={1} mb={[5, 5, 0]} title="Names">
    {names.map((name) => (
      <Toggle key={name.name}>
        {({ on, toggle }) => {
          const Icon = on ? ChevronUpIcon : ChevronDownIcon;
          return (
            <>
              <List.Item onClick={toggle}>
                <Box maxWidth="calc(100% - 105px)">
                  <List.Item.Title>{name.name}</List.Item.Title>
                  {/* <List.Item.Subtitle overflow="auto">{transaction.txid}</List.Item.Subtitle> */}
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
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Profile
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">
                          <Link
                            passHref
                            href={{
                              pathName: '/names/single',
                              query: { name: name.name },
                            }}
                            as={`/name/${name.name}`}
                          >
                            <Type fontFamily="brand" is="a">
                              View Profile
                            </Type>
                          </Link>
                        </Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Timestamp
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{moment(name.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Block
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{name.block_number}</Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Transaction
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{name.txid}</Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Owner
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{name.address}</Type>
                      </Box>
                    </Flex>
                    {/* {transaction.historyData.scratch_area && (
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          Memo
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Type fontFamily="brand">{transaction.historyData.scratch_area}</Type>
                        </Box>
                      </Flex>
                    )}
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Block
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{transaction.block_id}</Type>
                      </Box>
                    </Flex>
                    
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Sender
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">
                          <Link
                            passHref
                            href={{
                              pathName: '/address/stacks',
                              query: { address: transaction.historyData.sender },
                            }}
                            as={`/address/stacks/${transaction.historyData.sender}`}
                          >
                            <Type fontFamily="brand" is="a">
                              {transaction.historyData.sender}
                            </Type>
                          </Link>
                        </Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Recipient
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">
                          <Link
                            passHref
                            href={{
                              pathName: '/address/stacks',
                              query: { address: transaction.historyData.recipient },
                            }}
                            as={`/address/stacks/${transaction.historyData.recipient}`}
                          >
                            <Type fontFamily="brand" is="a">
                              {transaction.historyData.recipient}
                            </Type>
                          </Link>
                        </Type>
                      </Box>
                    </Flex> */}
                  </Box>
                </Box>
              )}
            </>
          );
        }}
      </Toggle>
    ))}
  </Card>
);

export default NamesList;
