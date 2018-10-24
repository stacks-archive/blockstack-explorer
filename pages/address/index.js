import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

import { fetchAddress } from '@common/lib/client/api';

class AddressesPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const reqData = (req && req.params) || query;
    const { address, data } = reqData;
    let addressData = data;
    if (!addressData) {
      addressData = await fetchAddress(address);
    }
    return {
      address: {
        id: address,
        ...addressData,
      },
      meta: {
        title: 'Addresses',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        Address data for {this.props.address.id}
        <Flex>
          <pre>
            <code>{JSON.stringify(this.props.address, null, 2)}</code>
          </pre>
        </Flex>
      </Flex>
    );
  }
}

export default AddressesPage;
