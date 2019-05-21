import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import Link from 'next/link';
import moment from 'moment';
import { Card } from '@components/card';
import { List } from '@components/list';
// import NProgress from 'nprogress';
import { Page } from '@components/page';
import { Hover, Toggle } from 'react-powerplug';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { fetchSTXTransactions } from '@common/lib/client/api';
import { stacksValue } from '@common/lib/units';

const SideNavButton = ({ active, loading, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Flex
        px={4}
        py={4}
        mb={3}
        width={['calc(100%)', 'calc(50% - 6px)', '100%']}
        border="1px solid"
        borderColor="blue.mid"
        borderRadius={4}
        boxShadow={active || hovered || loading ? 'general' : undefined}
        bg={active || hovered || loading ? 'white' : 'rgba(255,255,255,0.5)'}
        justifyContent="space-between"
        alignItems="center"
        transition={1}
        transform={['none', !active && (hovered || loading) ? 'translateX(10px)' : 'none']}
        cursor={!active ? 'pointer' : undefined}
        {...bind}
        {...rest}
      />
    )}
  </Hover>
);

class TransactionsPage extends React.Component {
  static async getInitialProps() {
    const { transfers } = await fetchSTXTransactions();
    // const { namespaces, total } = await fetchNamespaces();
    return {
      // totalNames: total,
      // namespaces,
      transactions: transfers,
      meta: {
        title: 'Transactions',
      },
    };
  }

  state = {
    view: 'stx',
  };

  views = {
    stx: 'STX Transactions',
    names: 'Name Registrations',
    subdomains: 'Subdomain Registrations',
  };

  setTransactionsView(namespace) {
    this.setState({ view: namespace });
  }

  render() {
    const { view } = this.state;
    const { views } = this;
    const { transactions } = this.props;
    return (
      <Page>
        <Card
          boxShadow="none"
          bg="transparent"
          borderColor="transparent"
          position={['static', 'static', 'sticky']}
          top="116px"
          width={1}
          maxWidth={['100%', '100%', '300px']}
          mr={[0, 0, 5]}
        >
          <Flex justifyContent="space-between" flexWrap="wrap">
            {/* <SideNavButton active={view === 'all'} onClick={() => this.setTransactionsView('all')}>
              <List.Item.Title m={0} p={0}>
                All Transactions
              </List.Item.Title>
            </SideNavButton> */}
            {Object.keys(views).map((key) => (
              <SideNavButton
                key={key}
                active={view === key}
                // loading={loading === namespace}
                onClick={() => this.setTransactionsView(view)}
              >
                <List.Item.Title>{views[key]}</List.Item.Title>
                {/* <List.Item.Subtitle>{loading === namespace ? 'Loading...' : ''}</List.Item.Subtitle> */}
              </SideNavButton>
            ))}
          </Flex>
        </Card>
        <Page.Main width={[1, 1, 'calc(100% - 300px)']}>
          {/* <Card width={1} mb={[5, 5, 0]} title="Names">
            <NamesList list={this.state.namespaces[this.state.view]} />
          </Card> */}
          {/* <NamespaceNames name={view} /> */}
          <Card width={1} mb={[5, 5, 0]} title={views[view]}>
            {/* <NamesList list={this.state.namespaces[this.state.view]} /> */}
            {transactions.map((transaction) => (
              <Toggle key={transaction.txid}>
                {({ on, toggle }) => {
                  const Icon = on ? ChevronUpIcon : ChevronDownIcon;
                  return (
                    <React.Fragment>
                      <List.Item onClick={toggle}>
                        <Box maxWidth="calc(100% - 105px)">
                          <List.Item.Title>
                            {stacksValue(parseInt(transaction.historyData.token_fee, 10))}
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
                                  {moment(transaction.timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                                </Type>
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
                            </Flex>
                          </Box>
                        </Box>
                      )}
                    </React.Fragment>
                  );
                }}
              </Toggle>
            ))}
          </Card>
        </Page.Main>
      </Page>
    );
  }
}

export default TransactionsPage;
