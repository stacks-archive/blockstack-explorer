import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { NamesList } from '@containers/lists/names';
import { Card } from '@components/card';
import { fetchNames, fetchNamespaces, fetchNamespaceNames } from '@common/lib/client/api';
import { List } from '@components/list';
import produce from 'immer';
import NProgress from 'nprogress';
class NamesPage extends React.Component {
  static async getInitialProps({ req, query, ...rest }) {
    const names = await fetchNames();
    const { namespaces, total } = await fetchNamespaces();
    return {
      nameOperations: names.map((name) => ({
        name,
      })),
      totalNames: total,
      namespaces,
      meta: {
        title: 'Names',
      },
    };
  }

  state = {
    namespaces: {
      all: this.props.nameOperations,
    },
    loading: false,
    view: 'all',
  };

  setLoading = (namespace) =>
    setTimeout(
      () =>
        NProgress.start() &&
        this.setState(
          produce((draft) => {
            draft.loading = namespace;
          }),
        ),
      120,
    );

  fetchNamepaceNames = async (namespace) => {
    const timer = this.setLoading(namespace);
    const names = await fetchNamespaceNames(namespace);
    this.setState(
      produce((draft) => {
        draft.namespaces[namespace] = names.map((name) => ({ name }));
        draft.loading = false;
        draft.view = `${namespace}`;
      }),
    );
    clearTimeout(timer);
    NProgress.done();
  };

  render() {
    return (
      <Flex p={5} flexDirection="row" alignItems="flex-start" width={1}>
        <Card
          boxShadow={'none'}
          bg="transparent"
          borderColor={'transparent'}
          position="sticky"
          top={'116px'}
          width="400px"
          mr={[0, 0, 5]}
        >
          <List.Item
            hoverBg={'white'}
            bg={this.state.view === 'all' ? 'white !important' : undefined}
            boxShadow={this.state.view === 'all' ? 'general' : undefined}
            onClick={() => this.fetchNamepaceNames('all')}
            borderColor="transparent"
          >
            <List.Item.Title>All Namespaces</List.Item.Title>
            <List.Item.Subtitle>{this.props.totalNames}</List.Item.Subtitle>
          </List.Item>
          {this.props.namespaces.map(({ namespace, count }) => (
            <List.Item
              hoverBg={'white'}
              borderColor="transparent"
              boxShadow={this.state.view === namespace ? 'general' : undefined}
              bg={this.state.view === namespace ? 'white !important' : undefined}
              onClick={() => this.fetchNamepaceNames(namespace)}
            >
              <List.Item.Title>.{namespace}</List.Item.Title>
              <List.Item.Subtitle>{this.state.loading === namespace ? 'Loading...' : count}</List.Item.Subtitle>
            </List.Item>
          ))}
        </Card>
        <Card width={1} mb={[5, 5, 0]} title={'Names'}>
          <NamesList list={this.state.namespaces[this.state.view]} />
        </Card>
      </Flex>
    );
  }
}

export default NamesPage;
