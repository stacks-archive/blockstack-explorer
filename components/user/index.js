import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Social, NonSocialItems } from '@components/social';
import { ConnectedAvatar } from '@components/avatar';
import { ConnectedAppsList } from '@components/apps';
import Link from 'next/link';

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
const generateAutomaticSections = (data, arr = keys, params) => {
  const LinkWrapper = ({ query, ...rest }) => (
    <Link
      href={{
        pathname: `/${params.path}/single`,
        query: {
          [params.query]: query,
        },
      }}
      as={`/${params.path}/${query}`}
      prefetch
      passHref
      {...rest}
    />
  );
  return arr.map(
    (key, i) =>
      data[key] ? (
        <Section.Subsection label={key} key={i}>
          <Box maxWidth={'100%'} overflow="auto">
            {params ? (
              <LinkWrapper query={data[key]}>
                <Type is="a" fontFamily="brand">
                  {data[key]}
                </Type>
              </LinkWrapper>
            ) : (
              <Type fontFamily="brand">{data[key]}</Type>
            )}
          </Box>
        </Section.Subsection>
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
    {generateAutomaticSections(nameRecord)}
  </Section>
);

/**
 * Most recent block related keys
 */
const BlocksSection = ({ nameRecord, ...rest }) => (
  <Section pb={4} pr={4} {...rest}>
    <Box display="grid" gridTemplateColumns="40% 40%">
      {generateAutomaticSections(nameRecord, blockKeys, { path: 'blocks', query: 'hash' })}
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
          <Section.Subsection label="Multiplayer Apps Used" children={children} />
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
    <Section.Subsection label="Blockstack ID">
      <Type>{id}</Type>
    </Section.Subsection>
    <Section.Subsection label="Owner Address">
      <Link
        href={{
          pathname: '/address/single',
          query: {
            address: ownerAddress,
          },
        }}
        as={`/address/${ownerAddress}`}
        prefetch
        passHref
      >
        <Type is="a" fontFamily="brand">
          {ownerAddress}
        </Type>
      </Link>
    </Section.Subsection>
  </Section>
);
/**
 * ID and Owner address
 */
const Addresses = ({ account, ...rest }) => (
  <NonSocialItems
    account={account}
    wrapper={(props) => (
      <Section pb={4} {...rest}>
        <Section.Subsection {...props} />
      </Section>
    )}
  />
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
      <Addresses account={account} />
      <AppsSection apps={apps} />
      <BlocksSection nameRecord={nameRecord} />
      {/*<TransactionsSection nameRecord={nameRecord} />*/}
      <ViewZoneFileSection zoneFileUrl={zone_file_url} />
    </Card>
  );
};

export { UserCard };
