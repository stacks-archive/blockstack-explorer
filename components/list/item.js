import React from 'react';
import Link from 'next/link';
import { Flex, Box, Type } from 'blockstack-ui';
import sys from 'system-components';

const Title = ({ overflow, ...rest }) => (
  <Box
    maxWidth="100%"
    style={{
      wordBreak: 'break-all',
    }}
  >
    <Type
      fontSize={2}
      fontWeight={500}
      pb={1}
      color="blue.dark"
      style={{
        wordBreak: 'break-all',
      }}
      {...rest}
    />
  </Box>
);
const Subtitle = ({ overflow, ...rest }) => (
  <Box
    maxWidth="100%"
    overflow={overflow}
    style={{
      wordBreak: 'break-all',
    }}
  >
    <Type
      fontSize={1}
      color="blue.mid"
      style={{
        wordBreak: 'break-all',
      }}
      {...rest}
    />
  </Box>
);

const noLastBorder = {
  '&:last-child': {
    'border-bottom': 'none',
  },
};

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
    transition: 1,
    color: 'blue.dark',
  },
  ({ theme: { colors }, hoverBg, hoverColor, noLink }) =>
    noLink
      ? { ...noLastBorder }
      : {
          ...noLastBorder,
          '&:hover': {
            background: hoverBg || colors.blue.light,
            color: hoverColor || undefined,
            cursor: hoverBg ? 'pointer' : undefined,
          },
        },
);

const Item = ({ href, as, ...rest }) =>
  href ? (
    <Link href={href} passHref as={as}>
      <ListItemComponent is="a" href={as || href} {...rest} />
    </Link>
  ) : (
    <ListItemComponent {...rest} />
  );

Item.Title = Title;
Item.Subtitle = Subtitle;
export { Item };
