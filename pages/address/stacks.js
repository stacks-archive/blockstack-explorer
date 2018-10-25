import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchStacksAddress } from '@common/lib/client/api';
import { StacksAddressCard } from '@containers/cards/stacks-address';
import { StacksUnlockingChart } from '@containers/charts/stacks-unlocking-chart';
import { StacksTxList } from '@containers/lists/stacks-tx-list';

export default class StacksAddressPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const addr = req && req.params ? req.params.address : query.address;
    const address = await fetchStacksAddress(addr);
    return {
      address,
      meta: {
        title: `Stacks Address ${addr}`,
      },
    };
  }
  state = {
    STXUSD: '',
  };

  render() {
    const { address } = this.props;
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <Box mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']}>
          <StacksAddressCard address={address} />
        </Box>
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          <Card width={1} title="Transactions">
            <StacksTxList />
          </Card>
          {address.cumulativeVestedAtBlocks ? (
            <StacksUnlockingChart STXUSD={this.state.STXUSD} handleOnChange={this.setState} />
          ) : null}
        </Box>
      </Flex>
    );
  }
}
