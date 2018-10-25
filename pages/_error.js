import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Layout } from '@components/layout';

export default () => (
  <Layout meta={{ title: 'Not Found' }}>
    <Flex>
      <Box width={1}>
        <Type textAlign="center" fontSize={5}>
          Sorry! We couldn't find this page.
        </Type>
      </Box>
    </Flex>
  </Layout>
);
