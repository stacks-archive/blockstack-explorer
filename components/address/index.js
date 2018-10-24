import React from 'react';
import { Box, Type } from 'blockstack-ui';
import { Card } from '@components/card';
import { Section } from '@components/section';
import QRCode from 'qrcode.react';
import Link from 'next/link';

/**
 * Keys we want to display
 */
const blockKeys = [
  'block_number',
  'first_registered',
  'last_renewed',
  'namespace_block_number',
  'preorder_block_number',
];
const keys = [
  'importer',
  'importer_address',
  'consensus_hash',
  'op_fee',
  'preorder_hash',
  'revoked',
  'sender',
  'sender_pubkey',
  'txid',
  'value_hash',
];

/**
 * Pass an object and set of keys and this will render subsections for each
 */
const generateAutomaticSections = (data, arr = keys, params) => {
  const LinkWrapper = ({ query, ...rest }) => (
    <Link
      href={{
        pathname: `/${params.path}/single`,
        query: {
          [params.query]: query,
        },
      }}
      as={`/${params.path}/${query}`}
      prefetch
      passHref
      {...rest}
    />
  );
  return arr.map(
    (key, i) =>
      data[key] ? (
        <Section.Subsection label={key} key={i}>
          <Box maxWidth={'100%'} overflow="auto">
            {params ? (
              <LinkWrapper query={data[key]}>
                <Type is="a" fontFamily="brand">
                  {data[key]}
                </Type>
              </LinkWrapper>
            ) : (
              <Type fontFamily="brand">{data[key]}</Type>
            )}
          </Box>
        </Section.Subsection>
      ) : null,
  );
};

/**
 * Some latest transaction data
 *
 * Currently hidden because it might not be helpful
 */
const AutomatedSection = ({ iterable, ...rest }) => (
  <Section pb={4} {...rest}>
    {generateAutomaticSections(iterable, Object.keys(iterable))}
  </Section>
);

/**
 * Bring it all together now
 */
const AddressCard = ({ address, ...rest }) => {
  const { data, value } = address;
  const { names, transactions, ...iterable } = data;
  return (
    <Card title="Address Details" {...rest}>
      <Section alignItems="center" justifyContent={'center'} py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={value} />
      </Section>
      <AutomatedSection iterable={iterable} />
    </Card>
  );
};

export { AddressCard };
