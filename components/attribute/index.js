import React from 'react';
import Link from 'next/link';
import { Section } from '@components/section';
import { Box, Type } from 'blockstack-ui';

export const Attribute = ({ label, value, link }) => (
  <Section.Subsection label={label}>
    <Box maxWidth="100%" overflow="auto">
      {link ? (
        <Link passHref href={link.href} as={link.as} prefetch>
          <Type fontFamily="brand" is="a">
            {value}
          </Type>
        </Link>
      ) : (
        <Type fontFamily="brand">{value}</Type>
      )}
    </Box>
  </Section.Subsection>
);
