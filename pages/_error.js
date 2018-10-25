import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';

export default ({ statusCode }) => (
  <Flex>
    <Box width={1}>
      <Type textAlign="center" fontSize={5} display="block" mt={4}>
        Sorry! We couldn't find this page.
      </Type>
      <Type textAlign="center" fontSize={4} display="block">
        {`Status Code: ${statusCode}`}
      </Type>
    </Box>
  </Flex>
);
