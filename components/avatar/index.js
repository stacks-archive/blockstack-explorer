import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { AccountCircleIcon } from 'mdi-react';
import { getProfileImage } from '@common';
import { Consumer } from '@pages/_app';

const Avatar = ({ src, size = 120, ...rest }) => (
  <Flex
    size={size}
    borderRadius={size}
    bg="blue.mid"
    backgroundImage={`url(${src})`}
    backgroundSize="cover"
    boxShadow="general"
    alignItems="center"
    justifyContent="center"
    {...rest}
  >
    {!src ? (
      <Box opacity={1}>
        <AccountCircleIcon color="white" size={120} />
      </Box>
    ) : null}
  </Flex>
);

const ConnectedAvatar = ({ ...rest }) => (
  <Consumer>
    {({ user }) => {
      if (!user) return null;
      const src = getProfileImage(user);
      return <Avatar src={src} {...rest} />;
    }}
  </Consumer>
);

export { ConnectedAvatar, Avatar };
