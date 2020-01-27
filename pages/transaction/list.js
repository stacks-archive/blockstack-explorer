import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import Link from 'next/link';
import moment from 'moment';
import { Card } from '@components/card';
import { List } from '@components/list';
import NProgress from 'nprogress';
import { Page } from '@components/page';
import { Hover, Toggle } from 'react-powerplug';
import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import {
  fetchSTXTransactions,
  fetchNameRegistrations,
  fetchSubdomainRegistrations,
  fetchAllTransactions,
} from '@common/lib/client/api';
import { stacksValue } from '@common/lib/units';
import NamesList from '@containers/lists/transactions/names';
import SubdomainsList from '@containers/lists/transactions/subdomains';
import AllTransactionsList from '@containers/lists/transactions/all';

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
    const [{ transfers }, { names }, { subdomains }, { history }] = await Promise.all([
      fetchSTXTransactions(),
      fetchNameRegistrations(),
      fetchSubdomainRegistrations(),
      fetchAllTransactions(),
    ]);
    // const { namespaces, total } = await fetchNamespaces();
    return {
      // totalNames: total,
      // namespaces,
      transactions: transfers,
      names,
      subdomains,
      history,
      meta: {
        title: 'Transactions',
      },
    };
  }

  state = {
    view: 'all',
    transactions: this.props.transactions /* eslint-disable-line */,
    names: this.props.names /* eslint-disable-line */,
    subdomains: this.props.subdomains /* eslint-disable-line */,
    history: this.props.history /* eslint-disable-line */,
    pages: {
      stx: 0,
      names: 0,
      subdomains: 0,
      all: 0,
    },
  };

  views = {
    all: 'All Transactions',
    stx: 'STX Transactions',
    names: 'Name Registrations',
    subdomains: 'Subdomain Registrations',
  };

  setTransactionsView(namespace) {
    this.setState({ view: namespace });
  }

  async nextPage() {
    const { view, pages } = this.state;
    const page = pages[view];
    const nextPage = page + 1;
    NProgress.start();
    if (view === 'stx') {
      const { transactions } = this.state;
      const { transfers } = await fetchSTXTransactions(nextPage);
      const newList = transactions.concat(transfers);
      this.setState({ transactions: newList, pages: { [view]: nextPage, ...pages } });
    } else if (view === 'names') {
      const { names } = this.state;
      const result = await fetchNameRegistrations(nextPage);
      const newList = names.concat(result.names);
      this.setState({ names: newList, pages: { [view]: nextPage, ...pages } });
    } else if (view === 'subdomains') {
      const { subdomains } = this.state;
      const result = await fetchSubdomainRegistrations(nextPage);
      const newList = subdomains.concat(result.subdomains);
      this.setState({ subdomains: newList, pages: { [view]: nextPage, ...pages } });
    }
    NProgress.done();
  }

  render() {
    const { view, names, subdomains, transactions, history } = this.state;
    const { views } = this;
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
            {Object.keys(views).map((key) => (
              <SideNavButton
                key={key}
                active={view === key}
                // loading={loading === namespace}
                onClick={() => this.setTransactionsView(key)}
              >
                <List.Item.Title>{views[key]}</List.Item.Title>
                {/* <List.Item.Subtitle>{loading === namespace ? 'Loading...' : ''}</List.Item.Subtitle> */}
              </SideNavButton>
            ))}
          </Flex>
        </Card>
        <Page.Main width={[1, 1, 'calc(100% - 300px)']}>
          {view === 'stx' && (
            <Card width={1} mb={[5, 5, 0]} title={views[view]}>
              {transactions.map((transaction) => (
                <Toggle key={transaction.txid}>
                  {({ on, toggle }) => {
                    const Icon = on ? ChevronUpIcon : ChevronDownIcon;
                    return (
                      <React.Fragment>
                        <List.Item onClick={toggle}>
                          <Box maxWidth="calc(100% - 105px)">
                            <List.Item.Title>{stacksValue(transaction.historyData.token_fee)}</List.Item.Title>
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
                                      <Type fontFamily="brand" is="a">
                                        {transaction.recipientSTX}
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
              <Flex py={4} justifyContent="center">
                <Button onClick={() => this.nextPage()}>View More</Button>
              </Flex>
            </Card>
          )}
          {view === 'names' && <NamesList nextPage={() => this.nextPage()} names={names} />}
          {view === 'subdomains' && <SubdomainsList nextPage={() => this.nextPage()} subdomains={subdomains} />}
          {view === 'all' && <AllTransactionsList nextPage={() => this.nextPage()} transactions={history} />}
        </Page.Main>
      </Page>
    );
  }
}

export default TransactionsPage;
