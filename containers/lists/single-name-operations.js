import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { List } from '@components/list';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { Toggle } from 'react-powerplug';

const NameOperationsList = ({ items, ...rest }) => (
  <Box>
    {items.map((item, i) => (
      <Toggle>
        {({ on, toggle }) => {
          const { opcode, txid } = item;
          const Icon = on ? ChevronUpIcon : ChevronDownIcon;
          return (
            <React.Fragment key={i}>
              <List.Item
                position={on ? 'sticky' : 'static'}
                zIndex={9999}
                bg={on ? 'white' : undefined}
                top={[0, 0, 90]}
                onClick={toggle}
              >
                <Box maxWidth="calc(100% - 48px)">
                  {/*TODO: is this the best thing to do for subdomains?*/}
                  <List.Item.Title>{opcode || 'Subdomain Registration'}</List.Item.Title>
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
                  <Box borderBottom={1} px={4} borderColor="blue.mid" pb={4}>
                    <Type>Transaction Details</Type>
                  </Box>
                  <Box pt={4}>
                    {Object.keys(item).map((key) => (
                      <Flex alignItems="flex-start" fontSize={1} pb={4} px={4} width={1}>
                        <Box minWidth="200px" pr={2}>
                          {key}
                        </Box>
                        {item[key] ? (
                          <Box maxWidth="100%" overflow="auto">
                            <Type fontFamily="brand">{item[key]}</Type>
                          </Box>
                        ) : (
                          <Box />
                        )}
                      </Flex>
                    ))}
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
