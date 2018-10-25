import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import QRCode from 'qrcode.react';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { List } from '@components/list/index';
import { fetchStacksAddress } from '@common/lib/client/api';

const Attribute = ({ label, value }) => (
  <Section.Subsection label={label}>
    <Box maxWidth="100%" overflow="auto">
      <Type fontFamily="brand">{value}</Type>
    </Box>
  </Section.Subsection>
);

const stacksValue = (value) => `${+`${Math.round(`${value * 10e-7}e+2`)}e-2`} Stacks`;

const txTitle = (tx) => {
  if (tx.operation === 'SENT') {
    return `Sent ${stacksValue(tx.tokensSent)}`;
  }
  if (tx.operation === 'RECEIVED') {
    return `Received ${stacksValue(tx.tokensSent)}`;
  }
  return tx.operation;
};

export default class StacksAddressPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const addr = req && req.params ? req.params.address : query.address;
    const address = await fetchStacksAddress(addr);
    return {
      address,
      meta: {
        title: `Stacks Address ${addr}`,
      },
    };
  }

  txList() {
    const { history } = this.props.address;
    return history.map((tx) => (
      <List.Item>
        <Box maxWidth="calc(100% - 105px)">
          <List.Item.Title>{txTitle(tx)}</List.Item.Title>
          <List.Item.Subtitle overflow="auto">{tx.txid}</List.Item.Subtitle>
        </Box>
      </List.Item>
    ));
  }

  render() {
    const { address } = this.props;
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <Box mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']}>
          <Card width={1} title="Address Details" pb={4}>
            <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
              <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address.address} />
            </Section>
            <Section pb={4}>
              <Attribute label="Address" value={address.address} />
              <Attribute label="BTC Address" value={address.btcAddress} />
              <Attribute label="Balance" value={stacksValue(address.balance)} />
              <Attribute label="Total Received" value={stacksValue(address.status.credit_value)} />
              <Attribute label="Total Sent" value={stacksValue(address.status.debit_value)} />
            </Section>
          </Card>
        </Box>
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          <Card width={1} title="Transactions">
            {this.txList()}
            {/* <Section>{JSON.stringify(address, null, 2)}</Section> */}
          </Card>
        </Box>
      </Flex>
    );
  }
}
