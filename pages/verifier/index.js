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
    const account = result[0]
    if (account.unlockPerMonthFormatted === "0") {
      return result.map((account, index) => (
        <Box width={1} borderTop="1px solid gray" mt={7}>
          <Type fontSize={3} lineHeight={3} mt={7}>
            This address does not unlock any tokens.
          </Type>
        </Box>
      ));
    }
    else {
      return result.map((account, index) => (
        <Box width={1} borderTop="1px solid gray" mt={7}>
          <Type fontSize={3} lineHeight={3} mt={7}>
            Your tokens automatically unlock at a rate of roughly {account.unlockPerMonthFormatted} STX per month until {account.unlockUntil}.
          </Type>
        </Box>
      ));
    }
  }

  render() {
    const { address, result, loading, notFound, total } = this.state;
    return (
      <Flex flexWrap="wrap">
        <Box width={[1, 0.5]} mx="auto" my={7}>
          {notFound && (
            <Box>
              <Type fontSize={3} lineHeight={3} mt={4} mb={7}>
                Sorry, no allocation was found for the address <Type fontFamily="brand">{address}</Type>.
              </Type>
            </Box>
          )}

          {result && (
            <Box>
              <Type mt={4} fontSize={5} fontWeight="500">
                Allocation Details for Address <span>&nbsp;</span> 
            </Type>
              <Type fontSize={3} lineHeight={3} mt={7}>
                <Type fontFamily="brand">{address}</Type>
              </Type>
              <Type fontSize={3} lineHeight={3} mt={4}>
                This address has {total} STX in total.
              </Type>
              {this.accounts()}
              <Box width={1} borderTop="1px solid gray" mt={7}>
                <Type fontSize={3} lineHeight={3} mt={7} display="block" fontWeight="600">
                  Please contact us immediately at <a href="mailto:support@stackstoken.com">support@stackstoken.com</a>{' '}
                  if any of this information appears incorrect to you. We&apos;ll need to make all corrections before
                  October 9th, 2019 before we hard fork the Stacks blockchain and distribute allocations.
                </Type>
              </Box>
              <Type mt={7} mb={7} fontSize={5} fontWeight="500">
                Check another address
              </Type>
            </Box>
          )}

          <Type fontSize={result ? 3 : 5} textAlign="left" lineHeight={3}>
            {/* Enter the STX address you used to purchase tokens during the 2019 Stacks sale below: */}
            Enter the wallet address you used to purchase STX tokens during Blockstack&apos;s 2019 Stacks offering:
          </Type>
          <Input
            mt={7}
            type="text"
            value={address}
            onChange={(evt) => this.setState({ address: evt.target.value, notFound: false })}
            placeholder="Your STX Address"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                return this.submit();
              }
            }}
          />

          <Button display="block" width={1} mt={7} onClick={() => this.submit()} disabled={loading ? true : undefined}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Box>
      </Flex>
    );
  }
}
