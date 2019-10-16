import React from 'react';
import { Card } from '@components/card/index';
import { Section } from '@components/section/index';
import { Time } from '@components/time';
import { Attribute } from '@components/attribute';

/**
 * Pass an object and set of keys and this will render subsections for each
 */
const generateAutomaticSections = (data, arr) =>
  arr.map((key) => {
    if (!data[key]) return '';
    return <Attribute label={key} key={key} value={data[key]} id={`block-card-${key}`} />;
  });

const keys = ['height', 'nonce', 'difficulty', 'merkleroot', 'hash', 'bits', 'size'];

/**
 * Some latest transaction data
 *
 * Currently hidden because it might not be helpful
 */
const AutomatedSection = ({ iterable, block, ...rest }) => (
  <Section pb={4} {...rest} showBorder={false}>
    <Attribute label="Time">
      <Time date={block.time} tooltip={false} />
    </Attribute>
    {block.reward && <Attribute label="Reward" value={`${block.reward} BTC`} />}
    <Attribute label="Transactions" value={block.txCount} />
    {block.poolInfo && block.poolInfo.poolName && <Attribute label="Mining Pool" value={block.poolInfo.poolName} />}
    {generateAutomaticSections(iterable, keys)}
  </Section>
);

/**
 * Bring it all together now
 */
const BlockCard = ({ block, ...rest }) => {
  const { transactions, poolInfo, nameOperations, ...iterable } = block;
  return (
    <Card title={`Block ${block.height}`} {...rest}>
      <AutomatedSection iterable={iterable} block={block} />
    </Card>
  );
};

export { BlockCard };
