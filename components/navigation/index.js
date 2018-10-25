import React, { memo } from 'react';
import Link from 'next/link';
import { Flex, Type, Box } from 'blockstack-ui';
import { withRouter } from 'next/router';

import sys from 'system-components';

const LinkComponent = sys(
  {
    is: Type,
    px: 4,
    py: 4,
    fontSize: 2,
    fontWeight: 500,
    transition: 1,
    color: 'white',
  },
  (props) => ({
    '&:hover': {
      opacity: 1,
    },
  }),
);

const items = [
  { path: '/blocks', active: 'block', label: 'Blocks' },
  { path: '/names', active: 'name', label: 'Names' },
];

const Navigation = memo(
  withRouter(
    ({ router, ...rest }) =>
      console.log(router) || (
        <Flex {...rest}>
          {items.map(({ label, path, active, ...linkProps }, i) => (
            <Link key={i} passHref href={path} prefetch>
              <LinkComponent
                opacity={router.pathname.includes(active) ? 1 : 0.5}
                is="a"
                style={{ textDecoration: 'none' }}
              >
                {label}
              </LinkComponent>
            </Link>
          ))}
        </Flex>
      ),
  ),
);

export { Navigation };
