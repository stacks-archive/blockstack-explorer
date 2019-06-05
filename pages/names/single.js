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
  static async getInitialProps({ req, query }) {
    const name = req && req.params ? req.params.name : query.name;

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

  state = {
    pageNum: 0,
    data:
      this.props.user.nameRecord && this.props.user.nameRecord.history ? [...this.props.user.nameRecord.history] : [],
    limit: 5,
    loading: false,
    doesNotHaveNextPage: false,
  };

  componentDidMount() {
    this.preloadNextPage();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { user } = this.props;
    if (prevProps.user.id !== user.id) {
      // different user, reset to initial state
      this.setState(
        {
          pageNum: 0,
          data: user.nameRecord && user.nameRecord.history ? [...user.nameRecord.history] : [],
          limit: 5,
          loading: false,
          doesNotHaveNextPage: false,
        },
        () => this.preloadNextPage(),
      );
    }
  }

  showMoreItems = () => {
    const { data, limit } = this.state;
    const all = data.length;
    if (limit < all) {
      if (limit + 5 > all) {
        this.setState(() => ({
          limit: all,
        }));
        this.preloadNextPage();
      } else {
        this.setState((state) => ({
          limit: state.limit + 5,
        }));
      }
    }
  };

  // eslint-disable-next-line react/destructuring-assignment
  preloadNextPage = async (page = this.state.pageNum + 1) => {
    const { data } = this.state;
    const { user } = this.props;
    if (data.length >= 20) {
      const { id } = user;
      this.setState({
        loading: true,
      });
      try {
        const newData = await fetchName(id, page);
        if (newData && newData.nameRecord && newData.nameRecord.history && newData.nameRecord.history.length) {
          this.setState((state) => ({
            data: [...state.data, ...newData.nameRecord.history],
            loading: false,
          }));
        }
      } catch (e) {
        // if we err, eg 404, set doesNotHaveNextPage true
        this.setState({
          loading: false,
          doesNotHaveNextPage: true,
        });
      }
    }
  };

  render() {
    const { user } = this.props;
    const { data: allItems, limit, doesNotHaveNextPage, loading } = this.state;
    const nameExists = user;
    if (!nameExists) return <Empty />;

    const items = allItems.slice(0, limit);
    const showMore = allItems.length > limit;
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
            <NameOperationsList key={user.id} items={items} />
            {showMore &&
              !doesNotHaveNextPage && (
                <Flex py={4} justifyContent="center">
                  <Button onClick={() => this.showMoreItems()}>{loading ? 'Loading...' : 'View More'}</Button>
                </Flex>
              )}
          </Card>
        </Page.Main>
      </Page>
    );
  }
}

export default NamesSinglePage;
