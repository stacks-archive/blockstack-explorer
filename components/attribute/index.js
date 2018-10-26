import React from 'react';
import Link from 'next/link';
import { Section } from '@components/section';
import { Box, Type } from 'blockstack-ui';

export const Attribute = ({ label, value, link, children }) => (
  <Section.Subsection label={label}>
    <Box maxWidth="100%" overflow="auto">
      {link ? (
        <Link passHref href={link.href} as={link.as} prefetch>
          <Type fontFamily="brand" is="a">
            {children || value}
          </Type>
        </Link>
      ) : (
        <Type fontFamily="brand">{children || value}</Type>
      )}
    </Box>
  </Section.Subsection>
);
