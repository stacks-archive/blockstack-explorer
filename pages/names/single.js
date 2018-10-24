import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName } from '@common/lib/client/api';
import { getProfileImage } from '@common';
import { UserCard } from '@components/user';
import { NameOperationsList } from '@containers/lists/single-name-operations';
class NamesSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const name = req && req.params ? req.params.name : query.name;

    const data = typeof name === 'undefined' ? {} : await fetchName(name);

    const ogImage = getProfileImage(data);

    return {
      user: {
        id: name,
        ...data,
      },
      meta: {
        title: name,
        description: (data.profile && data.profile.description) || undefined,
        ogImage,
      },
    };
  }

  render() {
    const nameExists = this.props.user;
    return nameExists ? (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} width={1}>
        <UserCard mb={[5, 5, 0]} mr={[0, 0, 5]} width={1} maxWidth={['100%', '100%', '380px']} {...this.props.user} />
        <Card width={[1, 1, 'calc(100% - 420px)']} title="Recent Operations">
          <NameOperationsList items={this.props.user.nameRecord.history} />
        </Card>
      </Flex>
    ) : (
      <Box>
        <Type>Name not found!</Type>
      </Box>
    );
  }
}

export default NamesSinglePage;
