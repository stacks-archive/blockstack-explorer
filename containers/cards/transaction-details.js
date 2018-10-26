import React from 'react';
import { Flex, Box, Type, theme } from 'blockstack-ui';
import { Card } from '@components/card';
import { SectionLabel } from '@components/section';
import { List } from '@components/list';
import { darken } from 'polished';
import { Stat } from '@components/stats';


const StatItem = ({ isLast, ...rest }) => (
  <Stat
    width={[1, 1, 1, '33.3333%']}
    borderRight={!isLast ? ['0', '0', '0', '1px solid'] : undefined}
    borderBottom={!isLast ? ['1px solid', '1px solid', '1px solid', 0] : undefined}
    borderColor={['blue.mid', 'blue.mid', 'blue.mid', 'blue.mid']}
    {...rest}
  />
);

const DirectionHeader = ({ children, ...rest }) => (
  <Flex
    bg="blue.light"
    borderTop="1px solid"
    postion="relative"
    borderBottom="1px solid"
    borderColor={['blue.mid', 'blue.mid', 'blue.mid', 'blue.mid']}
    flexGrow={1}
    alignItems="center"
    justifyContent="center"
    py={4}
    px={4}
    {...rest}
  >
    <Type color="#87acc4">{children}</Type>
  </Flex>
);

const UTXOItem = ({ label, value, spentTxId, ...rest }) => (
  <List.Item {...rest}>
    <List.Item.Title maxWidth="100%" overflow="auto" height="1rem" pb={0}>
      <SectionLabel>{label}</SectionLabel>
    </List.Item.Title>
    <List.Item.Title style={{ whiteSpace: 'nowrap' }} textAlign="right" ml={2} pb={0} pl={1}>
      {value || 0}
      <Type opacity={0.5}>BTC</Type>
      {!spentTxId && ' U'}
    </List.Item.Title>
  </List.Item>
);

const ToItem = ({ address, length, value, spentTxId, index, key, ...rest }) => (
  <UTXOItem
    key={key}
    href={
      address
        ? {
            pathname: '/address/single',
            query: {
              address,
            },
          }
        : undefined
    }
    as={address ? `/address/${address}` : undefined}
    prefetch={address ? true : undefined}
    passHref={address ? true : undefined}
    borderBottom={index === length - 1 ? '0' : '1px solid'}
    spentTxId={spentTxId}
    value={value}
    label={address || `Unparsed address`}
  />
);

const TransactionDetails = ({ valueOut, confirmations, fees, vin, vout, ...rest }) => (
  <Card width={1} mb={[5, 5, 5]} title="Details">
    <Flex flexDirection={['column', 'column', 'column', 'row']}>
      <StatItem>
        <Stat.Value>{valueOut}</Stat.Value>
        <Stat.Label>Total Transferred (BTC)</Stat.Label>
      </StatItem>
      <StatItem>
        <Stat.Value>{confirmations}</Stat.Value>
        <Stat.Label>Confirmations</Stat.Label>
      </StatItem>
      <StatItem isLast>
        <Stat.Value>{fees || 0}</Stat.Value>
        <Stat.Label>Fees (BTC)</Stat.Label>
      </StatItem>
    </Flex>
    <Flex flexDirection={['column', 'column', 'column', 'row']}>
      <Box width={[1, 1, 1, 0.5]} borderRight={[0, 0, 0, '1px solid']} borderColor={[0, 'blue.mid']} flexGrow={1}>
        <DirectionHeader position="relative" bg={darken(0.05, theme.colors.blue.light)}>
          <Box
            position="absolute"
            display={['none', 'none', 'none', 'block']}
            size={34}
            bg={darken(0.05, theme.colors.blue.light)}
            zIndex={1}
            top={7}
            right={-19}
            transform="rotate(45deg)"
          />
          FROM
        </DirectionHeader>
        {vin &&
          vin.length &&
          vin.map(({ addr, coinbase, value }) => (
            <UTXOItem
              length={vin.length}
              spentTxId
              address={addr}
              value={value}
              label={coinbase ? 'Mining Reward' : addr}
            />
          ))}
      </Box>
      <Box width={[1, 1, 1, 0.5]} flexGrow={1}>
        <DirectionHeader borderTop={[0, 0, 0, '1px solid']}>TO</DirectionHeader>
        {vout &&
          vout.length &&
          vout.map(({ addr, value, scriptPubKey, spentTxId, txid }, i) => (
            <ToItem
              vout={vout}
              key={i}
              index={i}
              length={vout.length}
              value={value}
              address={scriptPubKey && scriptPubKey.addresses && scriptPubKey.addresses[0]}
              spentTxId={spentTxId}
            />
          ))}
      </Box>
    </Flex>
  </Card>
);

export { TransactionDetails };
