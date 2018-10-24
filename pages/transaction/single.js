import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import { fetchTX } from '@common/lib/client/api';
import { NamesList } from '@containers/lists/names';
import { TxList } from '@containers/lists/tx-list';
import { Card } from '@components/card';
import { TransactionCard } from '@components/transaction';
import { SectionLabel } from '@components/section';
import { List } from '@components/list';

const StatItem = ({ ...rest }) => (
  <Flex flexGrow={1} alignItems="center" flexDirection="column" justifyContent="center" px={5} py={7} {...rest} />
);

const StatValue = ({ ...rest }) => <Type pb={4} fontSize={6} fontWeight={400} color="blue.dark" {...rest} />;

class TransactionSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const id = req && req.params ? req.params.tx : query.tx;
    const data = await fetchTX(id);

    return {
      tx: {
        id,
        ...data,
      },
      meta: {
        title: `Transaction: ${id}`,
      },
    };
  }

  render() {
    const { valueIn, valueOut, confirmations, vin, vout, fees } = this.props.tx;
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <TransactionCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} transaction={this.props.tx} />
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          <Card width={1} mb={[5, 5, 5]} title="Details">
            <Flex>
              <StatItem>
                <StatValue>{valueIn}</StatValue>
                <SectionLabel>Total Transferred</SectionLabel>
              </StatItem>
              <StatItem>
                <StatValue>{confirmations}</StatValue>
                <SectionLabel>Confirmations</SectionLabel>
              </StatItem>
              <StatItem>
                <StatValue>{fees}</StatValue>
                <SectionLabel>Fees</SectionLabel>
              </StatItem>
            </Flex>
            <Flex bg="blue.light" borderTop="1px solid" borderBottom="1px solid" borderColor="blue.mid">
              <Flex flexGrow={1} alignItems="center" justifyContent="center" py={4} px={4}>
                FROM
              </Flex>
              <Flex flexGrow={1} alignItems="center" justifyContent="center" py={4} px={4}>
                TO
              </Flex>
            </Flex>
            <Flex>
              <Box width={[1, 0.5]} borderRight={[0, '1px solid']} borderColor={[0, 'blue.mid']} flexGrow={1}>
                {vin &&
                  vin.length &&
                  vin.map(({ addr, value, txid }) => (
                    <List.Item>
                      <List.Item.Title height={'1rem'} pb={0} fontFamily="brand">
                        {addr}
                      </List.Item.Title>
                      <List.Item.Title pb={0}>
                        {value} <Type opacity={0.5}>BTC</Type>
                      </List.Item.Title>
                    </List.Item>
                  ))}
              </Box>
              <Box width={[1, 0.5]} flexGrow={1}>
                {vout &&
                  vout.length &&
                  vout.map(({ addr, value, scriptPubKey, spentTxId, txid }, i) => (
                    <List.Item key={i} borderBottom={i === vout.length - 1 ? '0' : '1px solid'}>
                      <List.Item.Title height={'1rem'} pb={0} fontFamily="brand">
                        {(scriptPubKey && scriptPubKey.addresses && scriptPubKey.addresses[0]) || `Unparsed address`}
                      </List.Item.Title>
                      <List.Item.Title pb={0} pl={1}>
                        {value} <Type opacity={0.5}>BTC</Type>
                        {!spentTxId && ' U'}
                      </List.Item.Title>
                    </List.Item>
                  ))}
              </Box>
            </Flex>
          </Card>

          {/*{this.props.transactions.length ? (*/}
          {/*<Card width={1} mb={[5, 5, 0]} title="Transactions">*/}
          {/*<TxList />*/}
          {/*</Card>*/}
          {/*) : null}*/}
        </Box>
      </Flex>
    );
  }
}
export default TransactionSinglePage;
