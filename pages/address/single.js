import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';
import { fetchAddress } from '@client/api';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const address = req && req.params ? req.params.address : query.address;
    const data = await fetchAddress(address);
    return {
      address: {
        value: address,
        data,
      },
      meta: {
        title: `Address: ${address}`,
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.address.value}
        <pre>
          <code>{JSON.stringify(this.props.address, null, 2)}</code>
        </pre>
      </Flex>
    );
  }
}

export default AddressSinglePage;
