import React, { memo } from 'react';
import Link from 'next/link';
import { Flex, Inline } from 'blockstack-ui';
import { withRouter } from 'next/router';

import sys from 'system-components';

const LinkComponent = sys(
  {
    is: Inline,
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
  { path: '/blocks', active: 'block', label: 'Blocks', id: 'nav-blocks' },
  { path: '/names', active: 'name', label: 'Names', id: 'nav-names' },
  { path: '/transactions', active: 'transactions', label: 'Transactions', id: 'nav-transactions' },
];

const Navigation = memo(
  withRouter(({ router, ...rest }) => (
    <Flex {...rest}>
      {items.map(({ label, path, active, id, ...linkProps }, i) => (
        <Link key={i} passHref href={path}>
          <LinkComponent
            id={id}
            opacity={router.pathname.includes(active) ? 1 : 0.5}
            is="a"
            style={{ textDecoration: 'none' }}
          >
            {label}
          </LinkComponent>
        </Link>
      ))}
    </Flex>
  )),
);

export { Navigation };
