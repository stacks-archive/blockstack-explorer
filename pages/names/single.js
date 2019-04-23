import React from 'react';
import NProgress from 'nprogress';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName } from '@common/lib/client/api';
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
    if (prevProps.user.id !== this.props.user.id) {
      // different user, reset to initial state
      this.setState(
        {
          pageNum: 0,
          data:
            this.props.user.nameRecord && this.props.user.nameRecord.history
              ? [...this.props.user.nameRecord.history]
              : [],
          limit: 5,
          loading: false,
          doesNotHaveNextPage: false,
        },
        () => this.preloadNextPage(),
      );
    }
  }

  showMoreItems = () => {
    const all = this.state.data.length;
    if (this.state.limit < all) {
      if (this.state.limit + 5 > all) {
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

  preloadNextPage = async (page = this.state.pageNum + 1) => {
    if (this.state.data.length >= 20) {
      const { id } = this.props.user;
      this.setState({
        loading: true,
      });
      try {
        const data = await fetchName(id, page);
        if (data && data.nameRecord && data.nameRecord.history && data.nameRecord.history.length) {
          this.setState((state) => ({
            data: [...state.data, ...data.nameRecord.history],
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
    const nameExists = this.props.user;
    if (!nameExists) return <Empty />;

    const allItems = this.state.data;
    const items = allItems.slice(0, this.state.limit);
    console.log(this.props.user);
    const showMore = allItems.length > this.state.limit;
    if (!this.props.user.nameRecord) {
      return (
        <Page key={this.props.user.id}>
          <Page.Main>
            <Card py={8} textAlign="center">
              <Type>
                No user was found with the ID
                <Type fontWeight="bold" ml={1}>
                  {this.props.user.id}
                </Type>
              </Type>
            </Card>
          </Page.Main>
        </Page>
      );
    }
    return (
      <Page key={this.props.user.id}>
        <UserCard mb={[5, 5, 0]} mr={[0, 0, 5]} width={1} maxWidth={['100%', '100%', '380px']} {...this.props.user} />
        <Page.Main>
          <Card flexGrow={1} title="Recent Operations">
            <NameOperationsList key={this.props.user.id} items={items} />
            {showMore &&
              !this.state.doesNotHaveNextPage && (
                <Flex py={4} justifyContent="center">
                  <Button onClick={() => this.showMoreItems()}>
                    {this.state.loading ? 'Loading...' : 'View More'}
                  </Button>
                </Flex>
              )}
          </Card>
        </Page.Main>
      </Page>
    );
  }
}

export default NamesSinglePage;
