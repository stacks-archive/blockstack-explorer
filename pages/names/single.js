import React from 'react';
import NProgress from 'nprogress';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName, fetchBlockstackApps } from '@common/lib/client/api';
import { getProfileImage } from '@common';
import { UserCard } from '@containers/cards/user';
import { NameOperationsList } from '@containers/lists/single-name-operations';
import { Page } from '@components/page';

const Empty = () => (
  <Box>
    <Type>Name not found!</Type>
  </Box>
);

class NamesSinglePage extends React.Component {
  static async getInitialProps({ query }) {
    const { name } = query;
    const getName = () => (typeof name === 'undefined' ? {} : fetchName(name));
    // const [data, apps] = await Promise.all([getName]);
    const data = await getName();

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

  // state = {
  //   pageNum: 0,
  //   data:
  //     this.props.user.nameRecord && this.props.user.nameRecord.history ? [...this.props.user.nameRecord.history] : [],
  //   limit: 5,
  //   loading: false,
  //   doesNotHaveNextPage: false,
  // };

  componentDidMount() {
    // this.preloadNextPage();
  }

  // componentDidUpdate(prevProps, prevState, prevContext) {
  //   const { user } = this.props;
  //   if (prevProps.user.id !== user.id) {
  //     // different user, reset to initial state
  //     this.setState(
  //       {
  //         pageNum: 0,
  //         data: user.nameRecord && user.nameRecord.history ? [...user.nameRecord.history] : [],
  //         limit: 5,
  //         loading: false,
  //         doesNotHaveNextPage: false,
  //       },
  //       () => this.preloadNextPage(),
  //     );
  //   }
  // }

  render() {
    const { user } = this.props;
    const nameExists = user;
    if (!nameExists) return <Empty />;

    if (!user.nameRecord) {
      return (
        <Page key={user.id}>
          <Page.Main>
            <Card py={8} textAlign="center">
              <Type>
                No user was found with the ID
                <Type fontWeight="bold" ml={1}>
                  {user.id}
                </Type>
              </Type>
            </Card>
          </Page.Main>
        </Page>
      );
    }
    return (
      <Page key={user.id}>
        <UserCard mb={[5, 5, 0]} mr={[0, 0, 5]} width={1} maxWidth={['100%', '100%', '380px']} {...user} />
        <Page.Main>
          <Card flexGrow={1} title="Recent Operations">
            <NameOperationsList key={user.id} items={user.nameRecord} />
          </Card>
        </Page.Main>
      </Page>
    );
  }
}

export default NamesSinglePage;
