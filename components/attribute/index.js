import React from 'react';
import Link from 'next/link';
import { Section } from '@components/section';
import { Box, Type } from 'blockstack-ui';

export const Attribute = ({ clip = true, label, fontFamily = 'brand', value, link, children }) => {
  const clipProps = clip
    ? {
        maxWidth: '100%',
        overflow: 'auto',
      }
    : {};
  return (
    <Section.Subsection label={label}>
      <Box {...clipProps}>
        {link ? (
          <Link passHref href={link.href} as={link.as} prefetch>
            <Type fontFamily="brand" is="a">
              {children || value}
            </Type>
          </Link>
        ) : (
          <Type fontFamily={fontFamily} style={{ wordBreak: 'break-word' }}>
            {children || value}
          </Type>
        )}
      </Box>
    </Section.Subsection>
  );
};
