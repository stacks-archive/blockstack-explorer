import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { Social } from '@components/social';
import { ConnectedAvatar } from '@components/avatar';
import { ConnectedAppsList } from '@components/apps';

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

const TransactionsSection = ({ nameRecord, ...rest }) => (
  <Section pb={4} {...rest}>
    {generateAutomaticSubSections(nameRecord)}
  </Section>
);

const BlocksSection = ({ nameRecord, ...rest }) => (
  <Section pb={4} pr={4} {...rest}>
    <Box display="grid" gridTemplateColumns="40% 40%">
      {generateAutomaticSubSections(nameRecord, blockKeys)}
    </Box>
  </Section>
);

const AppsSection = ({ apps, ...rest }) =>
  apps ? (
    <ConnectedAppsList
      wrapper={({children}) => (
        <Section pb={4} {...rest}>
          <SubSection label="Multiplayer Apps Used" children={children} />
        </Section>
      )}
      pt={2}
    />
  ) : null;

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

const ViewZoneFileSection = ({ zoneFileUrl, ...rest }) => (
  <Section py={4} {...rest}>
    <Button is="a" href={zoneFileUrl} target={'_blank'}>
      View Raw Zone File
    </Button>
  </Section>
);

const UserCard = ({
  nameRecord,
  profile: { name, description, account, apps },
  zone_file,
  id,
  owner_address,
  ...rest
}) => {
  const { target: zone_file_url } = zone_file.uri[0];
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
