import React from 'react';
import { Box, Flex, Type } from 'blockstack-ui';
import { BlockstackOutlined } from '@components/svg';

const Footer = ({ ...rest }) => (
  <Box bg="blue.dark" color="white" px={4} py={7} {...rest}>
    <Flex flexDirection="column" px={5} color="white" opacity={0.5}>
      <Type pb={4} fontWeight={500}>
        Blockstack Token LLC
      </Type>
      <Type lineHeight={1.7} maxWidth="900px" fontSize={'12px'}>
        The Blockstack Tokens are a crypto asset that is currently being developed by Blockstack Token LLC, a Delaware
        {'limited liability company, whose website can be found at '}
        <Type is="a" href="https://stackstoken.com" target="_blank" color="white">
          www.blockstack.com
        </Type>
        . The website you are currently visiting (explorer.blockstack.org) is sponsored by Blockstack PBC, an affiliate
        of Blockstack Token LLC, and should not be viewed as an offer or sale of securities.
      </Type>
    </Flex>
  </Box>
);

export { Footer };
