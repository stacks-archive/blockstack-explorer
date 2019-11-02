import React from 'react';
import QRCode from 'qrcode.react';
import { Flex, Box, Type } from 'blockstack-ui';
import PropTypes from 'prop-types';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Attribute } from '@components/attribute';
import { stacksValue } from '@common/lib/units';

const getLockedAmount = (vestingTotal, history = [], balance) => {
  // const available = credit - debit;
  let unlocked = 0;
  let sent = 0;
  let received = 0;
  history.forEach((transfer) => {
    if (transfer.operation === 'UNLOCK') {
      unlocked += transfer.value;
    } else if (transfer.operation === 'SENT') {
      sent += transfer.value;
    } else if (transfer.operation === 'RECEIVED') {
      received += transfer.value;
    }
  });
  const locked = vestingTotal - unlocked;
  // return [locked, unlocked];
  let total = balance;
  if (vestingTotal) {
    total = vestingTotal - sent + received;
  }
  return { locked, unlocked, sent, received, total };
};

const StacksAddressCard = ({ address: { address, balance, status, vesting_total: vestingTotal, history } }) => {
  const { locked, unlocked, sent, received, total } = getLockedAmount(vestingTotal, history, balance);
  return address ? (
    <Card width={1} title="Stacks Address Details" pb={4}>
      <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
        <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address} />
      </Section>
      <Section pb={4} borderBottom="0">
        <Attribute label="Stacks Address" value={address} />
        <Section.Subsection label="Total at this address">
          <Type fontSize={3}>{stacksValue(total)}</Type>
        </Section.Subsection>
        <Section.Subsection label="Cumulative Address Activity" mt={2} />
        <Flex>
          <Box width={1 / 2}>
            <Section.Subsection label="Locked">
              <Type fontFamily="brand">{stacksValue(isNaN(locked) ? 0 : locked)}</Type>
            </Section.Subsection>
            <Section.Subsection label="unlocked">
              <Type fontFamily="brand">{stacksValue(unlocked)}</Type>
            </Section.Subsection>
          </Box>
          <Box width={1 / 2}>
            {status && (
              <>
                <Section.Subsection label="Sent">
                  <Type fontFamily="brand">{stacksValue(sent)}</Type>
                </Section.Subsection>
                <Section.Subsection label="Received">
                  <Type fontFamily="brand">{stacksValue(received)}</Type>
                </Section.Subsection>
              </>
            )}
          </Box>
        </Flex>
        <Section.Subsection label="Available Balance">
          <Type fontSize={3}>{stacksValue(balance)}</Type>
          {/* <Type fontSize={1} ml={2}>
            STX
          </Type> */}
        </Section.Subsection>
      </Section>
    </Card>
  ) : null;
};

StacksAddressCard.propTypes = {
  address: PropTypes.object.isRequired,
};

export { StacksAddressCard };
