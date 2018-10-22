import React from 'react';
import { SearchIcon } from 'mdi-react';
import { Flex, Box, Input } from 'blockstack-ui';

const Search = ({ ...rest }) => (
  <Box position={'relative'} width={[1, 1, '500px']} px={[4]} {...rest}>
    <Flex
      right={'20px'}
      color="blue.light"
      alignItems={'center'}
      justifyContent={'center'}
      position="absolute"
      height="100%"
      px={3}
      opacity={0.45}
    >
      <SearchIcon />
    </Flex>
    <Input
      minWidth={'100%'}
      type="text"
      pr={'48px'}
      variant="dark"
      placeholder="Search by address, block, name or transaction"
      spellCheck="false"
    />
  </Box>
);

export { Search };
