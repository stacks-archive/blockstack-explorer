import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { Tooltip } from '@components/tooltip';

/**
 * Misc visual components
 */

const SubsectionLabel = ({ tooltip, label, tooltipPosition }) => {
  if (tooltip) {
    return (
      <Tooltip text={tooltip} positioning={tooltipPosition}>
        <SectionLabel>{label}</SectionLabel>
      </Tooltip>
    );
  }
  return <SectionLabel>{label}</SectionLabel>;
};

const SubSection = ({ label, children, tooltip, tooltipPosition, ...rest }) => (
  <Box pt={4} {...rest}>
    {label ? (
      <Box pb={2}>
        <SubsectionLabel tooltip={tooltip} label={label} tooltipPosition={tooltipPosition} />
      </Box>
    ) : null}
    <span className={`subsection-${label.replace(' ', '-').toLowerCase()}`}>{children}</span>
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
