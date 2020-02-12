import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { AlertDecagramIcon } from 'mdi-react';
import Link from 'next/link';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    if (err) {
      console.error(err);
    }
    if (res) {
      res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    }
    const getStatusCode = () => {
      if (res && res.statusCode) return res.statusCode;
      if (err && err.statusCode) return err.statusCode;
      return 500;
    };
    const statusCode = getStatusCode();
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Flex bg="blue.light" flexGrow={1} alignItems="center" justifyContent="center">
        <Flex color="blue.neutral" flexDirection="column" justifyContent="center" alignItems="center" my={6}>
          <Flex color="blue.mid" alignItems="center" justifyContent="center" mx="auto">
            <AlertDecagramIcon size={120} />
          </Flex>
          {statusCode === 404 ? (
            <Type textAlign="center" fontSize={7} display="block" my={3}>
              Not Found!
            </Type>
          ) : (
            <Type maxWidth="250px" lineHeight={1.6} textAlign="center" fontSize={3} display="block" my={2}>
              Sorry, something seems to have gone wrong.
            </Type>
          )}
          <Box mt={5}>
            <Link href="/" passHref prefetch={false}>
              <Button is="a">Back Home</Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
    );
  }
}
