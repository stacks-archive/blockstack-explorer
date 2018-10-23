import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName } from '@client/api';
import fetch from 'cross-fetch';
import { UserCard } from '@components/user';
import { List } from '@components/list';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { Toggle } from 'react-powerplug';

const History = ({ items, ...rest }) => (
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
                  <List.Item.Title>{opcode}</List.Item.Title>
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

class NamesSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const name = req && req.params ? req.params.name : query.name;
    const data = await fetchName(name);
    const appData = await fetch('https://app-co-api.herokuapp.com/api/apps');
    const apps = await appData.json();
    return {
      user: {
        id: name,
        ...data,
      },
      apps,
      meta: {
        title: name,
      },
    };
  }

  render() {
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} width={1}>
        <UserCard mb={[5, 5, 0]} mr={[0, 0, 5]} width={1} maxWidth={['100%', '100%', '380px']} {...this.props.user} />
        <Card width={[1, 1, 'calc(100% - 420px)']} title="Recent Operations">
          <History items={this.props.user.nameRecord.history} />{' '}
        </Card>
      </Flex>
    );
  }
}

export default NamesSinglePage;
