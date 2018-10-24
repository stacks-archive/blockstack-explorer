import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { NamesList } from '@containers/lists/names';
import { Card } from '@components/card';
import { fetchNameOperations } from '@client/api';

class NamesPage extends React.Component {
  static async getInitialProps({ req, query, ...rest }) {
    const nameOperations = await fetchNameOperations();
    return {
      nameOperations,
      meta: {
        title: 'Names',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        <Card width={1} mb={[5, 5, 0]} title="Latest Names Registered" mr={[0, 0, 5]}>
          <NamesList />
        </Card>
      </Flex>
    );
  }
}

export default NamesPage;
