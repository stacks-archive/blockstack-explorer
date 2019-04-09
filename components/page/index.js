import React from 'react';
import { Flex, Box } from 'blockstack-ui';

const Page = ({ ...rest }) => (
  <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1} {...rest} />
);
const Main = ({ ...rest }) => <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1} {...rest} />;

Page.Main = Main;

export { Page };
