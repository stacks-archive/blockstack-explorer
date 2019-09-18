import React from 'react';
import { Flex, Box, Type, Input, Button } from 'blockstack-ui';
import { makeUrl, getJSON } from '../../common';

export default class Verifier extends React.Component {
  state = {
    address: '',
    result: null,
    notFound: false,
    loading: false,
    total: null,
  };

  async submit() {
    const { address, loading } = this.state;
    if (loading) {
      return;
    }
    this.setState({ loading: true, notFound: false, result: null, total: null });
    try {
      const url = makeUrl(`/api/v2/genesis-2019/${address}`);
      const { accounts, totalFormatted } = await getJSON(url);
      if (accounts) {
        this.setState({ result: accounts, loading: false, total: totalFormatted });
      } else {
        this.setState({ notFound: true, loading: false });
      }
    } catch (error) {
      console.error(error);
      this.setState({ notFound: true, loading: false });
    }
  }

  accounts() {
    const { result } = this.state;
    return result.map((account, index) => (
      <Box width={1} borderTop="1px solid gray" mt={7}>
        <Type fontSize={3} lineHeight={3} mt={7}>
          Investment #{index + 1} - {account.totalFormatted} STX
        </Type>
        <Type fontSize={3} lineHeight={3} mt={7}>
          This investment&apos;s vesting schedule is {account.unlockPerMonthFormatted} STX per month until{' '}
          {account.unlockUntil}.
        </Type>
      </Box>
    ));
  }

  render() {
    const { address, result, loading, notFound, total } = this.state;
    return (
      <Flex flexWrap="wrap">
        <Box width={[1, 0.5]} mx="auto" my={7}>
          <Type fontSize={5} textAlign="center" lineHeight={3}>
            Enter the STX address you used to purchase tokens during the 2019 Stacks sale below:
          </Type>
          <Input
            mt={7}
            type="text"
            value={address}
            onChange={(evt) => this.setState({ address: evt.target.value })}
            placeholder="Your STX Address"
          />

          <Button display="block" width={1} mt={7} onClick={() => this.submit()} disabled={loading ? true : undefined}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>

          {notFound && (
            <Box>
              <Type fontSize={3} lineHeight={3} mt={7}>
                Sorry, no allocation was found for the address <Type fontFamily="brand">{address}</Type>.
              </Type>
            </Box>
          )}

          {result && (
            <Box>
              <Type fontSize={3} lineHeight={3} mt={7}>
                <Type fontFamily="brand">{address}</Type> has a total allocation of {total} STX.
              </Type>
              <Type fontSize={3} lineHeight={3} mt={7}>
                You have a total of {result.length} investment allocations:
              </Type>
              {this.accounts()}
              <Box width={1} borderTop="1px solid gray" mt={7}>
                <Type fontSize={3} lineHeight={3} mt={7} display="block">
                  Please contact us immediately at <a href="mailto:support@stackstoken.com">support@stackstoken.com</a>{' '}
                  if any of this information appears incorrect to you. We&apos;ll need to make all corrections before
                  October 10th, 2019 before we hard fork the Stacks blockchain and distribute allocations.
                </Type>
              </Box>
            </Box>
          )}
        </Box>
      </Flex>
    );
  }
}
