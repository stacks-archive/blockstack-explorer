import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';
import { fetchName } from '@client/api';

class NamesSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const name = req && req.params ? req.params.name : query.name;
    const data = await fetchName(name);
    return {
      user: {
        id: name,
        ...data,
      },
      meta: {
        title: 'Names',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.user.id}
      </Flex>
    );
  }
}

export default NamesSinglePage;
