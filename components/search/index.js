import React from 'react';
import { SearchIcon } from 'mdi-react';
import { Flex, Box, Input } from 'blockstack-ui';
import { search } from '@common/lib/search';

const handleSearch = async (event) => {
  if (event.key === 'Enter') {
    await search(event.target.value);
  }
};

const Search = ({ ...rest }) => (
  <Box position="relative" width={[1, 1, '500px']} px={[4]} flexGrow={1} {...rest}>
    <Flex
      left="20px"
      color="blue.light"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      height="100%"
      px={3}
      opacity={0.45}
    >
      <SearchIcon />
    </Flex>
    <Input
      minWidth="100%"
      type="text"
      pl="48px"
      variant="dark"
      placeholder="Search by address, block, name or transaction"
      spellCheck="false"
      onKeyUp={handleSearch}
    />
  </Box>
);

export { Search };
