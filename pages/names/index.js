import React from 'react';
import { Flex, Box, Card } from 'blockstack-ui';

class NamesPage extends React.Component {
  static async getInitialProps({ req, query, ...rest }) {
    const name = req && req.params ? req.params.name : query.name;
    return {
      name,
      meta: {
        title: 'Names',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        data for {this.props.name}
      </Flex>
    );
  }
}

export default NamesPage;
