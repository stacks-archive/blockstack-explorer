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
  return arr.map((key, i) =>
    data[key] ? (
      <Section.Subsection label={key} key={i}>
        <Box maxWidth="100%" overflow="auto">
          {params ? (
            <Link
              href={{
                pathname: `/${params.path}/single`,
                query: {
                  [params.query]: data[key],
                },
              }}
              as={`/${params.path}/${data[key]}`}
              passHref
              prefetch={false}
            >
              <Type is="a" fontFamily="brand">
                {data[key]}
              </Type>
            </Link>
          ) : (
            <Type fontFamily="brand" style={{ wordBreak: 'break-word' }} id={`tx-card-${key}`}>
              {data[key]}
            </Type>
          )}
        </Box>
      </Section.Subsection>
    ) : null,
  );
};

const keys = ['txid', 'blockHash'];

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
            id: tx.blockheight,
          },
        },
        as: `/block/${tx.blockheight}`,
      }}
    />
    <Attribute clip={false} label="time">
      <Time date={tx.blockUnixTime} />
    </Attribute>
    {tx.memo && <Attribute value={tx.memo} label="Memo" />}
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
