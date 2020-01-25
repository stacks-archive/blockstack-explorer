import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { List } from '@components/list';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { Toggle } from 'react-powerplug';
import Link from 'next/link';
import moment from 'moment';

const NameOperationsList = ({ items, ...rest }) => (
  <Box>
    {items.map((item, i) => (
      <Toggle key={item.txid}>
        {({ on, toggle }) => {
          const { opcode, txid } = item;
          const Icon = on ? ChevronUpIcon : ChevronDownIcon;
          return (
            <React.Fragment>
              <List.Item
                position={on ? 'sticky' : 'static'}
                zIndex={9999}
                bg={on ? 'white' : undefined}
                top={[0, 0, 90]}
                onClick={toggle}
              >
                <Box maxWidth="calc(100% - 48px)">
                  {/* TODO: is this the best thing to do for subdomains? */}
                  <List.Item.Title>
                    {!opcode || opcode === 'NAME_UPDATE' ? 'Subdomain Registration' : opcode}
                  </List.Item.Title>
                  <List.Item.Subtitle overflow="auto">{txid}</List.Item.Subtitle>
                </Box>
                <Box>
                  <Flex opacity={0.5} alignItems="center" justifyContent="center" px={0} py={0} size={36}>
                    <Icon size={32} />
                  </Flex>
                </Box>
              </List.Item>
              {on ? (
                <Box borderBottom={1} borderColor="blue.mid" color="blue.dark" bg="blue.light" py={4}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={1}
                    px={4}
                    borderColor="blue.mid"
                    pb={4}
                  >
                    <Type fontSize={1}>Transaction Details</Type>
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
                      <Button bg="white" is="a" size="small">
                        View Full Transaction
                      </Button>
                    </Link>
                  </Flex>
                  <Box pt={4}>
                    {item.name && (
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          name
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Link
                            href={{
                              pathname: '/names/single',
                              query: { name: item.name },
                            }}
                            as={`/name/${item.name}`}
                            passHref
                            prefetch={false}
                          >
                            <Type fontFamily="brand" is="a">
                              {item.name}
                            </Type>
                          </Link>
                        </Box>
                      </Flex>
                    )}
                    {item.opcode && (
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          opcode
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          <Type fontFamily="brand">{item.opcode}</Type>
                        </Box>
                      </Flex>
                    )}
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        block_id
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Link
                          href={{
                            pathname: '/blocks/single',
                            query: { id: item.block_id },
                          }}
                          as={`/block/${item.block_id}`}
                          passHref
                          prefetch={false}
                        >
                          <Type fontFamily="brand" is="a">
                            {item.block_id}
                          </Type>
                        </Link>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        txid
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Link
                          href={{
                            pathname: '/transaction/single',
                            query: {
                              tx: item.txid,
                            },
                          }}
                          as={`/tx/${item.txid}`}
                          passHref
                          prefetch={false}
                        >
                          <Type fontFamily="brand" is="a">
                            {item.txid}
                          </Type>
                        </Link>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        address
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{item.address}</Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        sender
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">{item.sender}</Type>
                      </Box>
                    </Flex>
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        time
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">
                          {moment
                            .unix(item.time)
                            .utc()
                            .format('DD MMMM YYYY HH:MM UTC')}
                        </Type>
                      </Box>
                    </Flex>
                    {item.subdomains && (
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          Subdomains
                        </Box>
                        <Box maxWidth="100%" overflow="auto">
                          {item.subdomains.map((subdomain) => (
                            <Link
                              href={{
                                pathname: '/names/single',
                                query: { name: subdomain.fully_qualified_subdomain },
                              }}
                              as={`/name/${subdomain.fully_qualified_subdomain}`}
                              passHref
                              prefetch={false}
                            >
                              <Type fontFamily="brand" display="block" is="a">
                                {subdomain.fully_qualified_subdomain}
                              </Type>
                            </Link>
                          ))}
                        </Box>
                      </Flex>
                    )}
                  </Box>
                </Box>
              ) : null}
            </React.Fragment>
          );
        }}
      </Toggle>
    ))}
  </Box>
);
export { NameOperationsList };
