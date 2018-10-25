import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';

export default () => (
  <Flex>
    <Box width={1}>
      <Type textAlign="center" fontSize={5} display="block" my={9}>
        Sorry! We couldn't find this page.
      </Type>
    </Box>
  </Flex>
);
