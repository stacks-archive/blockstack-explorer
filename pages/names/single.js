import React from 'react';
import NProgress from 'nprogress';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName } from '@common/lib/client/api';
import { getProfileImage } from '@common';
import { UserCard } from '@containers/cards/user';
import { NameOperationsList } from '@containers/lists/single-name-operations';
import { Page } from '@components/page';

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

  constructor(props) {
    super(props);
    this.state = {
      hasMoreHistory: props.user.nameRecord.history > 5,
      loadedHistory: props.user.nameRecord.history,
      pageNum: 0,
      hasLoadedMoreHistory: false,
    };
  }

  async loadMoreHistory() {
    NProgress.start();
    const { id } = this.props.user;
    let { pageNum, loadedHistory } = this.state;
    pageNum += 1;
    const { nameRecord } = await fetchName(id, pageNum);
    loadedHistory = loadedHistory.concat(nameRecord.history);
    this.setState(
      {
        loadedHistory,
        pageNum,
        hasMoreHistory: nameRecord.history.length > 5,
      },
      () => {
        NProgress.done();
      },
    );
  }

  render() {
    const nameExists = this.props.user;

    const { loadedHistory, hasMoreHistory, hasLoadedMoreHistory } = this.state;

    /**
     * TODO: we need to fetch the initial data with next.js and not keep it in state.
     * It causes a bug when you navigate between names, the previous data is persisted
     * because it's in state. We want to only show additional state stored data on user
     * action, not on load. We should limit the initial view, and then show the remaining items,
     * and _then_ fetch more data from the server with loadMoreHistory()
     */

    const smallList = this.props.user.nameRecord.history.slice(0, 5);

    return nameExists ? (
      <Page key={this.props.user.id}>
        <UserCard mb={[5, 5, 0]} mr={[0, 0, 5]} width={1} maxWidth={['100%', '100%', '380px']} {...this.props.user} />
        <Page.Main>
          <Card flexGrow={1} title="Recent Operations">
            <NameOperationsList items={hasLoadedMoreHistory ? loadedHistory : smallList} />
            {hasMoreHistory && (
              <Flex py={4} justifyContent="center">
                <Button onClick={() => this.loadMoreHistory()}>View More</Button>
              </Flex>
            )}
          </Card>
        </Page.Main>
      </Page>
    ) : (
      <Box>
        <Type>Name not found!</Type>
      </Box>
    );
  }
}

export default NamesSinglePage;
