import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { AlertDecagramIcon } from 'mdi-react';
import Link from 'next/link';
import { Page } from '@components/page';

const UnconfirmedTxMsg = () => (
  <Type maxWidth="500px" lineHeight={1.6} textAlign="center" fontSize={3} display="block" my={2}>
    This explorer only has visibility into confirmed transactions. Please use a BTC explorer like{' '}
    <a href="https://www.blockchain.com/explorer" target="blank" rel="noopener noreferrer">
      blockchain.com
    </a>{' '}
    to search for unconfirmed transactions.
  </Type>
);

class SearchPage extends React.Component {
  static async getInitialProps({ res, req, query, err }) {
    const searchTerm = req && req.params ? req.params.search : query.search;
    const statusCode = res && res.statusCode;
    return {
      ...query,
      statusCode,
      err,
      searchTerm,
    };
  }

  render() {
    const { msg, isHashSearch, statusCode } = this.props;
    const notFound = statusCode === 404;
    let errorContent;
    if (notFound) {
      if (msg) {
        errorContent = msg;
      } else {
        errorContent = 'No results found.';
      }
    } else {
      errorContent = 'Internal server error while searching.';
    }
    return (
      <Page>
        <Page.Main>
          <Flex bg="blue.light" flexGrow={1} alignItems="center" justifyContent="center">
            <Flex color="blue.neutral" flexDirection="column" justifyContent="center" alignItems="center" my={6}>
              <Flex color="blue.mid" alignItems="center" justifyContent="center" mx="auto">
                <AlertDecagramIcon size={120} />
              </Flex>
              <Type maxWidth="250px" textAlign="center" fontSize={7} display="block" my={3}>
                {errorContent}
              </Type>
              {isHashSearch ? <UnconfirmedTxMsg /> : <></>}
              <Box mt={5}>
                <Link href="/" passHref>
                  <Button is="a">Back Home</Button>
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Page.Main>
      </Page>
    );
  }
}

export default SearchPage;
