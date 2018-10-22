import React from 'react';
import Link from 'next/link';
import { Flex, Box, Type } from 'blockstack-ui';
import sys from 'system-components';

const Title = ({ ...rest }) => (
  <Box>
    <Type fontSize={2} fontWeight={500} pb={1} color={'blue.dark'} {...rest} />
  </Box>
);
const Subtitle = ({ ...rest }) => (
  <Box>
    <Type fontSize={1} color={'blue.mid'} {...rest} />
  </Box>
);

const ListItemComponent = sys(
  {
    is: Flex,
    borderBottom: '1px solid',
    borderColor: 'blue.mid',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    px: 4,
    py: 4,
    color: 'blue.dark',
  },
  ({ theme: { colors } }) => ({
    '&:hover': {
      background: colors.blue.light,
    },
  }),
);

const Item = ({ href, as, key, ...rest }) =>
  href ? (
    <Link href={href} passHref as={as} key={key}>
      <ListItemComponent is={'a'} href={as || href} {...rest} />
    </Link>
  ) : (
    <ListItemComponent key={key} {...rest} />
  );

Item.Title = Title;
Item.Subtitle = Subtitle;
export { Item };
