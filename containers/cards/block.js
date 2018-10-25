import React from 'react';
import { Box, Type } from 'blockstack-ui';
import { Card } from '@components/card/index';
import { Section } from '@components/section/index';

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
const BlockCard = ({ block, ...rest }) => {
  const { transactions, poolInfo, nameOperations, ...iterable } = block;
  return (
    <Card title={`Block ${block.height}`} {...rest}>
      <AutomatedSection iterable={iterable} />
    </Card>
  );
};

export { BlockCard };
