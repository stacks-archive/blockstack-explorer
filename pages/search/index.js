import React from 'react';
import Router from 'next/router';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { UserCard } from '@containers/cards/user';
import { NameOperationsList } from '@containers/lists/single-name-operations';
import { Page } from '@components/page';
import { search } from '@common/lib/search';

const Empty = (msg) => (
  <Box>
    <Type>{msg}</Type>
  </Box>
);

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchStatus: 'searching' };
  }

  static async getInitialProps({ req, query }) {
    const searchQuery = req && req.params ? req.params.search : query.search;
    return {
      searchQuery,
    };
  }

  async componentDidMount() {
    const { searchQuery } = this.props;
    const result = await search(searchQuery);
    if (!result) {
      this.setState({ searchStatus: 'notfound' });
    } else {
      this.setState({ searchStatus: 'redirecting' });
    }
  }

  render() {
    const { searchStatus } = this.state;
    if (searchStatus === 'searching') {
      return (
        <Page>
          <Page.Main>{Empty('Searching...')}</Page.Main>
        </Page>
      );
    }
    if (searchStatus === 'redirecting') {
      return (
        <Page>
          <Page.Main>{Empty('Loading...')}</Page.Main>
        </Page>
      );
    }
    if (searchStatus === 'notfound') {
      return (
        <Page>
          <Page.Main>{Empty('No results found')}</Page.Main>
        </Page>
      );
    }
    return Empty('Error');
  }
}

export default SearchPage;
