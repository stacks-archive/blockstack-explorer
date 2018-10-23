import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { Social } from '@components/social';
import { ConnectedAvatar } from '@components/avatar';
import { ConnectedAppsList } from '@components/apps';

/**
 * Misc visual components
 */
const SubSection = ({ label, children, ...rest }) => (
  <Box pt={4} {...rest}>
    <Box pb={2}>
      <SectionLabel>{label}</SectionLabel>
    </Box>
    {children}
  </Box>
);
const SectionLabel = ({ ...rest }) => (
  <Type textTransform="uppercase" letterSpacing={1.25} fontWeight="bold" color="#87acc4" fontSize={'11px'} {...rest} />
);
const Section = ({ ...rest }) => (
  <Flex color="blue.dark" flexDirection="column" px={4} borderBottom="1px solid" borderColor="blue.mid" {...rest} />
);

/**
 * Keys we want to display
 */
const blockKeys = [
  'block_number',
  'first_registered',
  'last_renewed',
  'namespace_block_number',
  'preorder_block_number',
];
const keys = [
  'importer',
  'importer_address',
  'consensus_hash',
  'op_fee',
  'preorder_hash',
  'revoked',
  'sender',
  'sender_pubkey',
  'txid',
  'value_hash',
];

/**
 * Pass an object and set of keys and this will render subsections for each
 */
const generateAutomaticSubSections = (data, arr = keys) => {
  return arr.map(
    (key, i) =>
      data[key] ? (
        <SubSection label={key} key={i}>
          <Box maxWidth={'100%'} overflow="auto">
            <Type fontFamily="brand">{data[key]}</Type>
          </Box>
        </SubSection>
      ) : null,
  );
};

/**
 * Some latest transaction data
 *
 * Currently hidden because it might not be helpful
 */
const TransactionsSection = ({ nameRecord, ...rest }) => (
  <Section pb={4} {...rest}>
    {generateAutomaticSubSections(nameRecord)}
  </Section>
);

/**
 * Most recent block related keys
 */
const BlocksSection = ({ nameRecord, ...rest }) => (
  <Section pb={4} pr={4} {...rest}>
    <Box display="grid" gridTemplateColumns="40% 40%">
      {generateAutomaticSubSections(nameRecord, blockKeys)}
    </Box>
  </Section>
);

/**
 * Apps
 *
 * if the user has multiplayer apps and they are on app.co, we can display them!
 */
const AppsSection = ({ apps, ...rest }) =>
  apps ? (
    <ConnectedAppsList
      wrapper={({ children }) => (
        <Section pb={4} {...rest}>
          <SubSection label="Multiplayer Apps Used" children={children} />
        </Section>
      )}
      pt={2}
    />
  ) : null;

/**
 * ID and Owner address
 */
const ProfileSection = ({ id, ownerAddress, ...rest }) => (
  <Section pb={4} {...rest}>
    <SubSection label="Blockstack ID">
      <Type>{id}</Type>
    </SubSection>
    <SubSection label="Owner Address">
      <Type fontFamily="brand">{ownerAddress}</Type>
    </SubSection>
  </Section>
);

/**
 * The 'profile' like part of the card, displays avatar, name, desc, and social proofs
 */
const IdentitySection = ({ name, id, description, account, ...rest }) => (
  <Section py={6} textAlign="center" justifyContent="center" alignItems="center">
    <ConnectedAvatar mb={5} />
    <Type pb={2} fontSize={4}>
      {name || id}
    </Type>
    {description && (
      <Type opacity={0.5} pt={3} px={4} lineHeight={1.5}>
        {description}
      </Type>
    )}
    {account &&
      account.length && (
        <Box>
          <Social pt={4} account={account} />
        </Box>
      )}
  </Section>
);

/**
 * Footer: view raw zone file button
 */
const ViewZoneFileSection = ({ zoneFileUrl, ...rest }) => (
  <Section py={4} {...rest}>
    <Button is="a" href={zoneFileUrl} target={'_blank'}>
      View Raw Zone File
    </Button>
  </Section>
);

/**
 * Bring it all together now
 */
const UserCard = ({ nameRecord, profile, zone_file, id, owner_address, ...rest }) => {
  if (!profile) return null;
  const { target: zone_file_url } = zone_file.uri[0];
  const { name, description, account, apps } = profile;
  return (
    <Card {...rest}>
      <IdentitySection id={id} name={name} account={account} description={description} />
      <ProfileSection id={id} ownerAddress={owner_address} />
      <AppsSection apps={apps} />
      <BlocksSection nameRecord={nameRecord} />
      {/*<TransactionsSection nameRecord={nameRecord} />*/}
      <ViewZoneFileSection zoneFileUrl={zone_file_url} />
    </Card>
  );
};

export { UserCard };
