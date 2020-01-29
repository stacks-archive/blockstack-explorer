import React from 'react';
import { Card } from '@components/card/index';
import { Section } from '@components/section/index';
import { Attribute } from '@components/attribute';
import { btcValue } from '@common/lib/units';
import QRCode from 'qrcode.react';

/**
 * Bring it all together now
 */
const AddressCard = ({ address, ...rest }) => {
  const { data, value } = address;
  return (
    <Card title="Address Details" {...rest}>
      <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={value} />
      </Section>
      <Section showBorder={false} pb={4}>
        <Attribute label="Address" value={value} id="address-card-address" />
        <Attribute label="Balance" value={`${btcValue(data.balance)} BTC`} />
        <Attribute label="Total Received" value={`${btcValue(data.totalReceived)} BTC`} />
        <Attribute label="Total Sent" value={`${btcValue(data.totalSent)} BTC`} />
        <Attribute label="Total Transactions" value={data.totalTransactionsCount} />
      </Section>
    </Card>
  );
};

export { AddressCard };
