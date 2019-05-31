import React from 'react';
import { Flex, Type, Box } from 'blockstack-ui';
import { NamesList } from '@containers/lists/names';
import { Card } from '@components/card';
import { fetchNames, fetchNamespaces, fetchNamespaceNames } from '@common/lib/client/api';
import { List } from '@components/list';
import produce from 'immer';
import NProgress from 'nprogress';
import { Page } from '@components/page';
import { Hover } from 'react-powerplug';
import { NamespaceNames } from '@containers/lists/namespace-names';

const SideNavButton = ({ active, loading, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Flex
        px={4}
        py={4}
        mb={3}
        width={['calc(100%)', 'calc(50% - 6px)', '100%']}
        border="1px solid"
        borderColor="blue.mid"
        borderRadius={4}
        boxShadow={active || hovered || loading ? 'general' : undefined}
        bg={active || hovered || loading ? 'white' : 'rgba(255,255,255,0.5)'}
        justifyContent="space-between"
        alignItems="center"
        transition={1}
        transform={['none', !active && (hovered || loading) ? 'translateX(10px)' : 'none']}
        cursor={!active ? 'pointer' : undefined}
        {...bind}
        {...rest}
      />
    )}
  </Hover>
);
class NamesPage extends React.Component {
  static async getInitialProps() {
    const { namespaces, total } = await fetchNamespaces();
    return {
      totalNames: total,
      namespaces,
      meta: {
        title: 'Names',
      },
    };
  }

  state = {
    view: 'all',
  };

  // setLoading = (namespace) =>
  //   setTimeout(
  //     () =>
  //       NProgress.start() &&
  //       this.setState(
  //         produce((draft) => {
  //           draft.loading = namespace;
  //         }),
  //       ),
  //     120,
  //   );

  setNamespace(namespace) {
    this.setState({ view: namespace });
  }

  // fetchNamepaceNames = async (namespace) => {
  //   const timer = this.setLoading(namespace);
  //   const names = await fetchNamespaceNames(namespace);
  //   this.setState(
  //     produce((draft) => {
  //       draft.namespaces[namespace] = names.map((name) => ({ name }));
  //       draft.loading = false;
  //       draft.view = `${namespace}`;
  //     }),
  //   );
  //   clearTimeout(timer);
  //   NProgress.done();
  // };

  render() {
    const { view, loading } = this.state;
    const { namespaces } = this.props;
    return (
      <Page>
        <Card
          boxShadow="none"
          bg="transparent"
          borderColor="transparent"
          position={['static', 'static', 'sticky']}
          top="116px"
          width={1}
          maxWidth={['100%', '100%', '300px']}
          mr={[0, 0, 5]}
        >
          <Flex justifyContent="space-between" flexWrap="wrap">
            <SideNavButton active={view === 'all'} onClick={() => this.setNamespace('all')}>
              <List.Item.Title m={0} p={0}>
                All Namespaces
              </List.Item.Title>
              {/* <List.Item.Subtitle>{this.props.totalNames}</List.Item.Subtitle> */}
            </SideNavButton>
            {namespaces.map(({ namespace }) => (
              <SideNavButton
                key={namespace}
                active={view === namespace}
                loading={loading === namespace}
                id={`namespaces-side-nav-${namespace}`}
                onClick={() => this.setNamespace(namespace)}
              >
                <List.Item.Title>{`.${namespace}`}</List.Item.Title>
                <List.Item.Subtitle>{loading === namespace ? 'Loading...' : ''}</List.Item.Subtitle>
              </SideNavButton>
            ))}
          </Flex>
        </Card>
        <Page.Main width={[1, 1, 'calc(100% - 300px)']}>
          {/* <Card width={1} mb={[5, 5, 0]} title="Names">
            <NamesList list={this.state.namespaces[this.state.view]} />
          </Card> */}
          <NamespaceNames name={view} />
        </Page.Main>
      </Page>
    );
  }
}

export default NamesPage;
