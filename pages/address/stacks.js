import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Card } from '@components/card';
import { Page } from '@components/page';
import { fetchStacksAddress } from '@common/lib/client/api';
import { StacksAddressCard } from '@containers/cards/stacks-address';
import { StacksUnlockingChart } from '@containers/charts/stacks-unlocking-chart';
import { StacksTxList } from '@containers/lists/stacks-tx-list';

export default class StacksAddressPage extends React.Component {
  static async getInitialProps({ res, query }) {
    const addr = query.address;
    const address = await fetchStacksAddress(addr);
    const historyExists = address && address.success !== false;
    if (!historyExists && res) {
      res.statusCode = 404;
    }
    return {
      addressQuery: addr,
      historyExists,
      address,
      meta: {
        title: `Stacks Address ${addr}`,
      },
    };
  }

  render() {
    const { address, historyExists, addressQuery } = this.props;

    if (!historyExists) {
      return (
        <Page key={addressQuery}>
          <Page.Main>
            <Card py={8} textAlign="center">
              <Type>
                No history was found for Stacks address
                <Type fontWeight="bold" ml={1}>
                  {addressQuery}
                </Type>
              </Type>
            </Card>
          </Page.Main>
        </Page>
      );
    }

    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <Box mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']}>
          <StacksAddressCard address={address} />
        </Box>
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          {address.history && address.history.length ? (
            <Card mb={5} width={1} title="Transactions">
              <StacksTxList />
              {address.history.length === 50 && (
                <Box width={1} py={4} px={3}>
                  <Type>Only showing the 50 most recent transactions.</Type>
                </Box>
              )}
            </Card>
          ) : null}
          {address.cumulativeVestedAtBlocks ? <StacksUnlockingChart /> : null}
        </Box>
      </Flex>
    );
  }
}
