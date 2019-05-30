import React from 'react';
import { Box, Type } from 'blockstack-ui';
import { Card } from '@components/card/index';
import { Section } from '@components/section/index';
import { Attribute } from '@components/attribute';
import { Time } from '@components/time';

import Link from 'next/link';

/**
 * Pass an object and set of keys and this will render subsections for each
 */
const generateAutomaticSections = (data, arr, params) => {
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
          <Box maxWidth="100%" overflow="auto">
            {params ? (
              <LinkWrapper query={data[key]}>
                <Type is="a" fontFamily="brand">
                  {data[key]}
                </Type>
              </LinkWrapper>
            ) : (
              <Type fontFamily="brand" style={{ wordBreak: 'break-word' }}>
                {data[key]}
              </Type>
            )}
          </Box>
        </Section.Subsection>
      ) : null,
  );
};

const keys = ['size', 'txid', 'blockhash'];

const convertBlockTimeToInt = (blockTime) => new Date(blockTime).getTime() / 1000;

/**
 * Some latest transaction data
 *
 * Currently hidden because it might not be helpful
 */
const AutomatedSection = ({ tx, ...rest }) => (
  <Section pb={4} {...rest} showBorder={false}>
    <Attribute
      label="Block"
      value={tx.blockheight}
      link={{
        href: {
          pathname: '/blocks/single',
          query: {
            hash: tx.blockhash,
          },
        },
        as: `/block/${tx.blockhash}`,
      }}
    />
    <Attribute clip={false} label="time">
      <Time date={convertBlockTimeToInt(tx.blockTime)} />
    </Attribute>
    {generateAutomaticSections(tx, keys)}
  </Section>
);

/**
 * Bring it all together now
 */
const TransactionCard = ({ transaction, ...rest }) => {
  const { vin, vout, id, ...tx } = transaction;
  return (
    <Card title="Transaction Information" {...rest}>
      <AutomatedSection tx={tx} />
    </Card>
  );
};

export { TransactionCard };
