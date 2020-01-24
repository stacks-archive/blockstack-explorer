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
  () => ({
    '&:hover': {
      opacity: 1,
    },
  }),
);

const items = [
  {
    href: '/blocks',
    as: '/blocks',
    active: 'block',
    label: 'Blocks',
    id: 'nav-blocks',
  },
  {
    href: '/names',
    as: '/names',
    active: 'name',
    label: 'Names',
    id: 'nav-names',
  },
  {
    href: '/transaction/list',
    as: '/transactions',
    active: 'transaction',
    label: 'Transactions',
    id: 'nav-transactions',
  },
];

const Navigation = memo(
  withRouter(({ router, ...rest }) => (
    <Flex {...rest}>
      {items.map(({ label, as, href, active, id, ...linkProps }, i) => (
        <Link key={id} href={href} as={as} passHref prefetch={false}>
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
