import React from 'react';
import QRCode from 'qrcode.react';
import { Flex, Box, Type } from 'blockstack-ui';
import PropTypes from 'prop-types';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Attribute } from '@components/attribute';
import { stacksValue } from '@common/lib/units';

const StacksAddressCard = ({
  address: {
    address,
    totalUnlocked,
    totalLocked,
    balance,
    status,
    tokensGranted,
    totalReceived,
    cumulativeVestedAtBlocks,
  },
}) =>
  address ? (
    <Card width={1} title="Stacks Address Details" pb={4}>
      <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address} />
      </Section>
      <Section pb={4} borderBottom="0">
        <Attribute label="Stacks Address" value={address} />
        <Section.Subsection
          label="Total at this address"
          tooltip="Total Stacks available to be sent, plus any remaining locked tokens"
          tooltipPosition="right"
        >
          <Type fontSize={3}>{stacksValue(parseInt(balance, 10) + totalLocked)}</Type>
        </Section.Subsection>
        <Section.Subsection label="Cumulative Address Activity" mt={2} />
        <Flex>
          {cumulativeVestedAtBlocks && (
            <Box width={1 / 2}>
              <Section.Subsection
                label="Locked"
                tooltip="The total Stacks that have not yet unlocked"
                tooltipPosition="right"
              >
                <Type fontFamily="brand">{stacksValue(totalLocked)}</Type>
              </Section.Subsection>
              <Section.Subsection
                label="unlocked"
                tooltip="The total Stacks that have unlocked so far"
                tooltipPosition="right"
              >
                <Type fontFamily="brand">{stacksValue(totalUnlocked)}</Type>
              </Section.Subsection>
            </Box>
          )}
          <Box width={1 / 2}>
            {status && (
              <>
                <Section.Subsection label="Sent" tooltip="Total Stacks sent from this address" tooltipPosition="right">
                  <Type fontFamily="brand">{stacksValue(status.debit_value)}</Type>
                </Section.Subsection>
                <Section.Subsection
                  label="Received"
                  tooltip="Total amount received from other addresses"
                  tooltipPosition="right"
                >
                  <Type fontFamily="brand">{stacksValue(totalReceived)}</Type>
                </Section.Subsection>
              </>
            )}
          </Box>
        </Flex>
        {!!tokensGranted && (
          <Section.Subsection label="Token Grants" tooltip="Stacks received from a hard fork" tooltipPosition="right">
            <Type fontFamily="brand">{stacksValue(tokensGranted)}</Type>
          </Section.Subsection>
        )}
        <Section.Subsection
          label="Available Balance"
          tooltip="Total Stacks available to be sent from this address"
          tooltipPosition="right"
        >
          <Type fontSize={3}>{stacksValue(balance)}</Type>
        </Section.Subsection>
      </Section>
    </Card>
  ) : null;

StacksAddressCard.propTypes = {
  address: PropTypes.object.isRequired,
};

export { StacksAddressCard };
