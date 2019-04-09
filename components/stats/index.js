import React from 'react';
import { Flex, Type } from 'blockstack-ui';
import { SectionLabel } from '@components/section';

const Value = ({ ...rest }) => (
  <Type pb={4} textAlign="center" fontSize={5} fontWeight={400} color="blue.dark" {...rest} />
);

const Stat = ({ isLast, ...rest }) => (
  <Flex flexGrow={1} alignItems="center" flexDirection="column" justifyContent="center" px={5} py={5} {...rest} />
);

const StatItem = ({ value, label, width = 0.5, ...rest }) => (
  <Stat {...rest} width={width}>
    <Stat.Value>{value}</Stat.Value>
    <Stat.Label>{label}</Stat.Label>
  </Stat>
);

Stat.Value = Value;
Stat.Label = SectionLabel;

export { Stat, StatItem };
