import React from 'react';
import Link from 'next/link';
import { Box, Type } from 'blockstack-ui';
import { Hover } from 'react-powerplug';
const Logo = ({ ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box display={['block', 'block', 'none', 'block']} style={{ flexShrink: 0 }} pl={[0, 0, 5]} py={[5]} {...rest}>
        <Link href="/">
          <Box is="a" href="/" {...bind}>
            <Type
              fontWeight="bold"
              display="inline-flex"
              flexDirection="column"
              color="white"
              letterSpacing={1.25}
              fontSize={3}
              style={{
                textTransform: 'uppercase',
              }}
            >
              <Type letterSpacing={1.75} opacity={hovered ? 1 : 0.5} fontSize={1}>
                Blockstack
              </Type>{' '}
              Explorer
            </Type>
          </Box>
        </Link>
      </Box>
    )}
  </Hover>
);

export { Logo };
