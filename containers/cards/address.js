import React from 'react';
import { Card } from '@components/card/index';
import { Section } from '@components/section/index';
import { Attribute } from '@components/attribute';
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
      <Section pb={4}>
        <Attribute label="Balance" value={`${data.balance} BTC`} />
        <Attribute label="Total Received" value={`${data.totalReceived} BTC`} />
        <Attribute label="Total Sent" value={`${data.totalSent} BTC`} />
        <Attribute label="Unconfirmed Balance" value={`${data.unconfirmedBalance} BTC`} />
        <Attribute label="Total Transactions" value={data.txApperances} />
      </Section>
    </Card>
  );
};

export { AddressCard };
