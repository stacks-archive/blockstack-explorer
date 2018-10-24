import React, { memo } from 'react';
import Link from 'next/link';
import { Flex, Type } from 'blockstack-ui';

import sys from 'system-components';

const LinkComponent = sys(
  {
    is: Type,
    px: 4,
    py: 4,
    fontSize: 2,
    fontWeight: 500,
    color: 'blue.light',
    opacity: 0.5,
    transition: 1,
  },
  (props) => ({
    '&:hover': {
      opacity: 1,
    },
  }),
);

const items = [{ path: '/blocks', label: 'Blocks' }, { path: '/names', label: 'Names' }];

const Navigation = memo(({ ...rest }) => (
  <Flex {...rest}>
    {items.map(({ label, path, ...linkProps }, i) => (
      <Link key={i} passHref href={path} prefetch>
        <LinkComponent is="a">{label}</LinkComponent>
      </Link>
    ))}
  </Flex>
));

export { Navigation };
