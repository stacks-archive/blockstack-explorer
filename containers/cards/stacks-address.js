import React from 'react';
import QRCode from 'qrcode.react';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Attribute } from '@components/attribute';
import { stacksValue } from '@common/lib/units';

const StacksAddressCard = ({ address: { address, btcAddress, balance, status }, ...rest }) =>
  address ? (
    <Card width={1} title="Address Details" pb={4}>
      <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address} />
      </Section>
      <Section pb={4} borderBottom={'0'}>
        <Attribute label="Address" value={address} />
        <Attribute
          label="BTC Address"
          value={btcAddress}
          link={{
            href: {
              query: {
                address: btcAddress,
              },
              pathname: '/address/single',
            },
            as: `/address/${btcAddress}`,
          }}
        />
        <Attribute label="Balance" value={stacksValue(balance)} />
        {status ? <Attribute label="Total Received" value={stacksValue(status.credit_value)} /> : null}
        {status ? <Attribute label="Total Sent" value={stacksValue(status.debit_value)} /> : null}
      </Section>
    </Card>
  ) : null;

export { StacksAddressCard };
