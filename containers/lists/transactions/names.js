import React from 'react';
import Link from 'next/link';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Toggle } from 'react-powerplug';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import moment from 'moment';
import { Card } from '@components/card';
import { List } from '@components/list';
import { Time } from '@components/time';

const NamesList = ({ names, nextPage }) => (
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
                  <List.Item.Subtitle>
                    <Time date={name.timestamp} />
                  </List.Item.Subtitle>
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
                            href={{
                              pathname: '/names/single',
                              query: { name: name.name },
                            }}
                            as={`/name/${name.name}`}
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
                    <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                      <Box minWidth="200px" pr={2}>
                        Timestamp
                      </Box>
                      <Box maxWidth="100%" overflow="auto">
                        <Type fontFamily="brand">
                          {moment
                            .unix(name.timestamp)
                            .utc()
                            .format('DD MMMM YYYY HH:MM UTC')}
                        </Type>
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
                  </Box>
                </Box>
              )}
            </>
          );
        }}
      </Toggle>
    ))}
    <Flex py={4} justifyContent="center">
      <Button onClick={() => nextPage()}>View More</Button>
    </Flex>
  </Card>
);

export default NamesList;
