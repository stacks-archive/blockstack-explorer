import React from 'react';
import QRCode from 'qrcode.react';
import { Flex, Box, Type } from 'blockstack-ui';
import PropTypes from 'prop-types';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Attribute } from '@components/attribute';
import { stacksValue } from '@common/lib/units';

const StacksAddressCard = ({
  address: { address, totalUnlocked, totalLocked, balance, status, tokensGranted, totalReceived },
}) =>
  address ? (
    <Card width={1} title="Stacks Address Details" pb={4}>
      <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address} />
      </Section>
      <Section pb={4} borderBottom="0">
        <Attribute label="Stacks Address" value={address} />
        <Section.Subsection label="Total at this address">
          <Type fontSize={3}>{stacksValue(parseInt(balance, 10) + totalLocked)}</Type>
        </Section.Subsection>
        <Section.Subsection label="Cumulative Address Activity" mt={2} />
        <Flex>
          <Box width={1 / 2}>
            <Section.Subsection label="Locked">
              <Type fontFamily="brand">{stacksValue(totalLocked)}</Type>
            </Section.Subsection>
            <Section.Subsection label="unlocked">
              <Type fontFamily="brand">{stacksValue(totalUnlocked)}</Type>
            </Section.Subsection>
          </Box>
          <Box width={1 / 2}>
            {status && (
              <>
                <Section.Subsection label="Sent">
                  <Type fontFamily="brand">{stacksValue(status.debit_value)}</Type>
                </Section.Subsection>
                <Section.Subsection label="Received">
                  <Type fontFamily="brand">{stacksValue(totalReceived)}</Type>
                </Section.Subsection>
              </>
            )}
          </Box>
        </Flex>
        {!!tokensGranted && (
          <Section.Subsection label="Token Grants">
            <Type fontFamily="brand">{stacksValue(tokensGranted)}</Type>
          </Section.Subsection>
        )}
        <Section.Subsection label="Available Balance">
          <Type fontSize={3}>{stacksValue(balance)}</Type>
        </Section.Subsection>
      </Section>
    </Card>
  ) : null;

StacksAddressCard.propTypes = {
  address: PropTypes.object.isRequired,
};

export { StacksAddressCard };
