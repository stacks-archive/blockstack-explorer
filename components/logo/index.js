import React from 'react';
import Link from 'next/link';
import { Box, Type } from 'blockstack-ui';
import { Hover } from 'react-powerplug';
import { BlockstackOutlined } from '@components/svg';

const Logo = ({ ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box style={{ flexShrink: 0 }} pl={[0, 0, 5]} py={[5]} {...rest}>
        <Link href="/" passHref prefetch={false}>
          <Box is="a" style={{ textDecoration: 'none' }} display="inline-flex" alignItems="center" {...bind}>
            <Box transition={1} opacity={hovered ? 1 : 0.5} size={36} mr={[3, 3, 0, 3]} color={'white'}>
              <BlockstackOutlined />
            </Box>
            <Box display={['block', 'block', 'none', 'block']}>
              <Type
                fontWeight="bold"
                display="inline-flex"
                flexDirection="column"
                color="white"
                letterSpacing={1.25}
                fontSize={3}
                textTransform="uppercase"
              >
                <Type letterSpacing={1.75} opacity={hovered ? 1 : 0.5} fontSize={1} transition={1}>
                  Blockstack
                </Type>{' '}
                Explorer
              </Type>
            </Box>
          </Box>
        </Link>
      </Box>
    )}
  </Hover>
);

export { Logo };
