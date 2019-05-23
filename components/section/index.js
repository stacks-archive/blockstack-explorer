import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';

/**
 * Misc visual components
 */
const SubSection = ({ label, children, ...rest }) => (
  <Box pt={4} {...rest}>
    {label ? (
      <Box pb={2}>
        <SectionLabel>{label}</SectionLabel>
      </Box>
    ) : null}
    {children}
  </Box>
);
export const SectionLabel = ({ ...rest }) => (
  <Type textTransform="uppercase" letterSpacing={1.25} fontWeight="bold" color="#87acc4" fontSize="11px" {...rest} />
);
const Section = ({ showBorder = true, ...rest }) => (
  <Flex
    color="blue.dark"
    flexDirection="column"
    px={4}
    borderBottom={showBorder ? '1px solid' : 'none'}
    borderColor="blue.mid"
    {...rest}
  />
);

Section.Label = SectionLabel;
Section.Subsection = SubSection;

export { Section };
