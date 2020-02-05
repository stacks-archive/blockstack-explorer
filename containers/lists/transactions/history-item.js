import React from 'react';
import Link from 'next/link';
import { Flex, Box, Type } from 'blockstack-ui';
import { Toggle } from 'react-powerplug';
import moment from 'moment';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { List } from '@components/list';
import { stacksValue } from '@common/lib/units';

export default ({ transaction }) => (
  <Toggle key={transaction.txid}>
    {({ on, toggle }) => {
      const Icon = on ? ChevronUpIcon : ChevronDownIcon;
      return (
        <React.Fragment>
          <List.Item onClick={toggle}>
            <Box maxWidth="calc(100% - 105px)">
              <List.Item.Title>
                {transaction.opcode === 'TOKEN_TRANSFER' && stacksValue(transaction.historyData.token_fee)}
                {transaction.opcode === 'NAME_UPDATE' && `Subdomain Registrations`}
                {transaction.opcode === 'NAME_REGISTRATION' && `${transaction.history_id} Registration`}
                {transaction.opcode === 'NAME_PREORDER' && `${transaction.history_id} Pre-order`}
                {transaction.opcode === 'NAME_RENEWAL' && `${transaction.history_id} Renewal`}
              </List.Item.Title>
              <List.Item.Subtitle overflow="auto">{transaction.txid}</List.Item.Subtitle>
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
                {transaction.historyData.scratch_area && (
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
                    Timestamp
                  </Box>
                  <Box maxWidth="100%" overflow="auto">
                    <Type fontFamily="brand">
                      {moment.unix(transaction.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                    </Type>
                  </Box>
                </Flex>
                {transaction.senderSTX && (
                  <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                    <Box minWidth="200px" pr={2}>
                      Sender
                    </Box>
                    <Box maxWidth="100%" overflow="auto">
                      <Type fontFamily="brand">
                        <Link
                          href={{
                            pathname: '/address/stacks',
                            query: { address: transaction.senderSTX },
                          }}
                          as={`/address/stacks/${transaction.senderSTX}`}
                          passHref
                          prefetch={false}
                        >
                          <Type fontFamily="brand" is="a">
                            {transaction.senderSTX}
                          </Type>
                        </Link>
                      </Type>
                    </Box>
                  </Flex>
                )}
                {transaction.recipientSTX && (
                  <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                    <Box minWidth="200px" pr={2}>
                      Recipient
                    </Box>
                    <Box maxWidth="100%" overflow="auto">
                      <Type fontFamily="brand">
                        <Link
                          href={{
                            pathname: '/address/stacks',
                            query: { address: transaction.recipientSTX },
                          }}
                          as={`/address/stacks/${transaction.recipientSTX}`}
                          passHref
                          prefetch={false}
                        >
                          <Type fontFamily="brand" is="a" >
                            {transaction.recipientSTX}
                          </Type>
                        </Link>
                      </Type>
                    </Box>
                  </Flex>
                )}
                {transaction.opcode === 'NAME_REGISTRATION' && (
                  <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                    <Box minWidth="200px" pr={2}>
                      Profile
                    </Box>
                    <Box maxWidth="100%" overflow="auto">
                      <Type fontFamily="brand">
                        <Link
                          href={{
                            pathname: '/names/single',
                            query: { name: transaction.history_id },
                          }}
                          as={`/name/${transaction.history_id}`}
                          passHref
                          prefetch={false}
                        >
                          <Type fontFamily="brand" is="a">
                            View Profile
                          </Type>
                        </Link>
                      </Type>
                    </Box>
                  </Flex>
                )}
                {transaction.subdomains && transaction.subdomains.length > 0 && (
                  <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                    <Box minWidth="200px" pr={2}>
                      Subdomains
                    </Box>
                    <Box maxWidth="100%" overflow="auto">
                      {transaction.subdomains.map((subdomain) => (
                        <Type fontFamily="brand" display="block">
                          <Link
                            href={{
                              pathname: '/names/single',
                              query: { name: subdomain },
                            }}
                            as={`/name/${subdomain}`}
                            passHref
                            prefetch={false}
                          >
                            <Type fontFamily="brand" is="a">
                              {subdomain}
                            </Type>
                          </Link>
                        </Type>
                      ))}
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
);
