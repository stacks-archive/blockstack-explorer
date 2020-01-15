import React from 'react';
import { SearchIcon, CloseCircleIcon } from 'mdi-react';
import { Flex, Box } from 'blockstack-ui';
import { search } from '@common/lib/search';
import Router from 'next/router';
import { State } from 'react-powerplug';

import { Input } from './styled';

const handleSearch = async (event) => {
  if (event.key === 'Enter') {
    const result = await search(event.target.value);
    if (!result) {
      // TODO: display failed search message
    }
  }
};

const SearchIndicator = () => (
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
);

const ClearContentsButton = ({ visible, ...rest }) => (
  <Flex
    right="20px"
    color="blue.light"
    alignItems="center"
    justifyContent="center"
    position="absolute"
    height="100%"
    px={3}
    opacity={visible ? 0.45 : 0}
    style={{
      pointerEvents: visible ? undefined : 'none',
    }}
    title="Reset Search"
    {...rest}
  >
    <CloseCircleIcon />
  </Flex>
);

const Search = ({ ...rest }) => (
  <State initial={{ value: '' }}>
    {({ state, setState }) => {
      const handleChange = (e) => setState({ value: e.target.value });
      const hasValue = state.value !== '';
      const clearValue = () => setState({ value: '' });

      if (hasValue) {
        // clear the value if we're navigating away
        Router.events.on('routeChangeStart', () => {
          clearValue();
        });
      }

      return (
        <Box
          is="form"
          position="relative"
          width={[1, 1, '500px']}
          px={[4]}
          flexGrow={1}
          {...rest}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(e);
          }}
        >
          <SearchIndicator />
          <ClearContentsButton visible={hasValue} onClick={clearValue} />
          <Input
            minWidth="100%"
            type="text"
            pl="48px"
            value={state.value}
            variant="dark"
            placeholder="Search by address, block, name or transaction"
            spellCheck="false"
            onChange={handleChange}
            onKeyUp={handleSearch}
            name="search"
            id="explorer-search-input"
          />
        </Box>
      );
    }}
  </State>
);
export { Search };
