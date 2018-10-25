import React from 'react';
import { Box, Flex, Type } from 'blockstack-ui';
import { BlockstackOutlined } from '@components/svg';

const Footer = ({ ...rest }) => (
  <Box bg="blue.dark" color="white" px={5} py={6} {...rest}>
    <Box pb={4}>
      <Type color={'blue.mid'} fontWeight={500}>
        Blockstack Token LLC
      </Type>
    </Box>
    <Box>
      <Type color={'blue.mid'}>
        For information related to the Stacks token, please visit{' '}
        <Type is="a" href={'https://stackstoken.com'} target={'_blank'} color={'white'}>
          stackstoken.com
        </Type>
      </Type>
    </Box>
  </Box>
);

export { Footer };
