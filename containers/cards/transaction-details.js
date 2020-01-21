import React from 'react';
import { Flex, Box, Type, theme } from 'blockstack-ui';
import { Card } from '@components/card';
import { List } from '@components/list';
import { darken } from 'polished';
import { Stat } from '@components/stats';
import { Tooltip } from '@components/tooltip';
import { ArrowExpandRightIcon, ArrowCollapseDownIcon } from 'mdi-react';
import { btcValue } from '@common/lib/units';

const StatItem = ({ isLast, ...rest }) => (
  <Stat
    width={[1, 1, 1, '33.3333%']}
    borderRight={!isLast ? ['0', '1px solid', '0', '1px solid'] : undefined}
    borderBottom={!isLast ? ['1px solid', 0, '1px solid', 0] : undefined}
    borderColor={['blue.mid', 'blue.mid', 'blue.mid', 'blue.mid']}
    textAlign="center"
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

const UTXOHref = (currency, address) => {
  if (currency === 'STX') {
    return {
      href: {
        pathname: '/address/stacks',
        query: {
          address,
        },
      },
      as: `/address/stacks/${address}`,
    };
  }
  const href = address
    ? {
        pathname: '/address/single',
        query: {
          address,
        },
      }
    : undefined;
  return {
    href,
    as: address ? `/address/${address}` : undefined,
  };
};

const UTXOItem = ({ label, address, value, to, spentTxId, currency = 'BTC', ...rest }) => (
  <List.Item
    {...UTXOHref(currency, address)}
    passHref={address ? true : undefined}
    flexDirection={['column', 'row']}
    minHeight="72px"
    noLink={!address}
    {...rest}
    // py={label.length > 16 ? 4 : '18px'}
  >
    <List.Item.Title fontFamily="brand" maxWidth="100%" overflow="auto" minHeight="1rem" pb={0}>
      {label}
    </List.Item.Title>
    <List.Item.Title style={{ whiteSpace: 'nowrap' }} textAlign="right" ml={2} pb={0} pt={[2, 0]} pl={1}>
      <Flex alignItems="center">
        {value && (
          <>
            {value || 0}
            <Type opacity={0.5} pl={1}>
              {currency}
            </Type>
          </>
        )}
        {to &&
          (!spentTxId ? (
            <Tooltip text="Unspent">
              <Box py={1} color="#70D142" pl={1}>
                <ArrowCollapseDownIcon size={18} />
              </Box>
            </Tooltip>
          ) : (
            <Tooltip text="Spent">
              <Box transform="translateY(2px)" py={1} pl={1} color="rgb(239, 111, 111)">
                <ArrowExpandRightIcon size={18} />
              </Box>
            </Tooltip>
          ))}
      </Flex>
    </List.Item.Title>
  </List.Item>
);

const ToItem = ({ address, length, value, spentTxId, index, key, ...rest }) => (
  <UTXOItem
    address={address}
    key={key}
    borderBottom={index === length - 1 ? '0' : '1px solid'}
    spentTxId={spentTxId}
    value={value}
    to
    label={address || `Unparsed address`}
  />
);

const TransactionDetails = ({ valueOut, confirmations, fees, vin, vout, historyData, ...tx }) => (
  <Card width={1} mb={[5, 5, 5]} title="Details">
    <Flex flexDirection={['column', 'row', 'column', 'row']}>
      {historyData ? (
        <StatItem>
          <Stat.Value>{tx.valueStacksFormatted}</Stat.Value>
          <Stat.Label>Total Transferred (STX)</Stat.Label>
        </StatItem>
      ) : (
        <StatItem>
          <Stat.Value>{valueOut}</Stat.Value>
          <Stat.Label>Total Transferred (BTC)</Stat.Label>
        </StatItem>
      )}
      <StatItem>
        <Stat.Value>{confirmations}</Stat.Value>
        <Stat.Label>Confirmations</Stat.Label>
      </StatItem>
      <StatItem isLast>
        <Stat.Value>{fees}</Stat.Value>
        <Stat.Label>Fees (BTC)</Stat.Label>
      </StatItem>
    </Flex>
    <Flex flexDirection={['column', 'column', 'column', 'column', 'row']}>
      <Box width={[1, 1, 1, 1, 0.5]} borderRight={[0, 0, 0, 0, '1px solid']} borderColor={[0, 'blue.mid']} flexGrow={1}>
        <DirectionHeader position="relative" bg={darken(0.05, theme.colors.blue.light)}>
          <Box
            position="absolute"
            display={['none', 'none', 'none', 'none', 'block']}
            size={34}
            bg={darken(0.05, theme.colors.blue.light)}
            zIndex={1}
            top={7}
            right={-19}
            transform="rotate(45deg)"
          />
          FROM
        </DirectionHeader>
        {historyData ? (
          <>
            <UTXOItem address={tx.senderSTX} label={tx.senderSTX} currency="STX" />
          </>
        ) : (
          <>
            {vin &&
              vin.length &&
              vin.map(({ addr, sequence, value }) => (
                <UTXOItem
                  length={vin.length}
                  spentTxId
                  address={addr}
                  value={value}
                  label={!sequence ? 'Mining Reward' : addr}
                />
              ))}
          </>
        )}
      </Box>
      <Box width={[1, 1, 1, 1, 0.5]} flexGrow={1}>
        <DirectionHeader borderTop={[0, 0, 0, 0, '1px solid']}>TO</DirectionHeader>
        {historyData ? (
          <UTXOItem address={tx.recipientSTX} label={tx.recipientSTX} currency="STX" />
        ) : (
          <>
            {vout &&
              vout.length &&
              vout.map(({ addr, value, spentTxId, txid }, i) => (
                <ToItem
                  vout={vout}
                  key={txid}
                  index={i}
                  length={vout.length}
                  value={value}
                  address={addr}
                  spentTxId={spentTxId}
                />
              ))}
          </>
        )}
        {/* {vout &&
          vout.length &&
          vout.map(({ addr, value, spentTxId, txid }, i) => (
            <ToItem
              vout={vout}
              key={txid}
              index={i}
              length={vout.length}
              value={value}
              address={addr}
              spentTxId={spentTxId}
            />
          ))} */}
      </Box>
    </Flex>
  </Card>
);

export { TransactionDetails };
