import React from 'react';
import { Box, Flex, Type } from 'blockstack-ui';
import { BlockstackOutlined } from '@components/svg';

const Footer = ({ ...rest }) => (
  <Box bg="blue.dark" color="white" px={5} py={6} {...rest}>
    <Box pb={4}>
      <Type color="blue.mid" fontWeight={500}>
        Blockstack Token LLC
      </Type>
    </Box>
    <Box>
      <Type color="blue.mid" maxWidth="400px" fontSize={1}>
        The Blockstack Tokens are a crypto asset that is currently being developed by Blockstack Token LLC, a Delaware
        {'limited liability company, whose website can be found at '}
        <Type is="a" href="https://stackstoken.com" target="_blank" color="white">
          www.blockstack.com
        </Type>
        . The website you are currently visiting (explorer.blockstack.org) is sponsored by Blockstack PBC, an affiliate
        of Blockstack Token LLC, and should not be viewed as an offer or sale of securities.
      </Type>
    </Box>
  </Box>
);

export { Footer };
