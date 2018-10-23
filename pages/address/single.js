import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';
import { fetchName } from '@client/api';

class AddressSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const id = req && req.params ? req.params.id : query.id;
    const data = await fetchName(id);
    return {
      user: {
        id,
        ...data,
      },
      meta: {
        title: id,
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.user.id}
        <pre>
          <code>{JSON.stringify(this.props.user, null, 2)}</code>
        </pre>
      </Flex>
    );
  }
}

export default AddressSinglePage;
