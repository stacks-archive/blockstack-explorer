import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchName } from '@client/api';
import { getProfileImage, extractRootDomain, uniq } from '@lib/common';
import { Consumer } from '@pages/_app';
import fetch from 'cross-fetch';

import {
  AccountCircleIcon,
  TwitterIcon,
  LinkedinBoxIcon,
  GithubCircleIcon,
  HackernewsIcon,
  InstagramIcon,
  KeyIcon,
  BitcoinIcon,
  EthereumIcon,
  FacebookBoxIcon,
} from 'mdi-react';

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

const AppsBar = ({ apps: userApps, ...rest }) => (
  <Consumer>
    {({ apps }) => {
      const blockstackApps = apps.apps.filter(({ authentication }) => authentication === 'Blockstack');
      const domains = Object.keys(userApps).map((domain) => extractRootDomain(domain));
      const applist = [];
      domains.forEach((domain) => {
        const app = blockstackApps.find((appco) => appco.website.includes(domain));
        if (app) applist.push(app);
      });

      if (applist.length) {
        return (
          <Box>
            <Box pb={4}>
              <SectionLabel>Apps used</SectionLabel>
            </Box>
            <Flex flexWrap="wrap">
              {uniq(applist).map(({ imgixImageUrl, name, Slugs }) => (
                <Box
                  is="a"
                  href={`https://app.co/app/${Slugs[0].value}`}
                  target="_blank"
                  mr={2}
                  bg={'blue.mid'}
                  mb={2}
                  size={42}
                  backgroundImage={`url(${imgixImageUrl})`}
                  borderRadius={10}
                  backgroundSize="cover"
                />
              ))}
            </Flex>
          </Box>
        );
      }
      // return usedApps.map((app) => <img src={app.imgixImageUrl} />);
      return null;
      // todo fetch from https://app-co-api.herokuapp.com/api/apps
    }}
  </Consumer>
);

const getSocialIcon = (service) => {
  switch (service) {
    case 'twitter':
      return TwitterIcon;
    case 'linkedIn':
      return LinkedinBoxIcon;
    case 'github':
      return GithubCircleIcon;
    case 'hackerNews':
      return HackernewsIcon;
    case 'ssh':
      return KeyIcon;
    case 'instagram':
      return InstagramIcon;
    case 'bitcoin':
      return BitcoinIcon;
    case 'ethereum':
      return EthereumIcon;
    case 'facebook':
      return FacebookBoxIcon;
    default:
      return null;
  }
};

const SocialItem = ({ service, identifier, proofUrl, ...item }) => {
  const Icon = getSocialIcon(service);
  return Icon ? (
    <Box
      title={identifier}
      color="blue.neutral"
      is={proofUrl ? 'a' : 'div'}
      target={proofUrl ? '_blank' : undefined}
      href={proofUrl ? proofUrl : undefined}
      display="inline-flex"
      p={1}
    >
      <Icon />
    </Box>
  ) : null;
};

const SocialBar = ({ account, ...rest }) => {
  if (!account) return null;
  const itemsWithProofs = [...account.filter((item) => item.proofUrl !== '')];
  return account ? (
    <Flex {...rest}>
      {itemsWithProofs.map((item) => (
        <SocialItem {...item} />
      ))}
    </Flex>
  ) : null;
};

const Avatar = ({ ...rest }) => (
  <Consumer>
    {({ user }) => {
      const src = getProfileImage(user);

      return (
        <Flex
          size={120}
          borderRadius={120}
          bg="blue.mid"
          backgroundImage={`url(${src})`}
          backgroundSize="cover"
          title={user.id}
          boxShadow="general"
          alignItems="center"
          justifyContent="center"
          {...rest}
        >
          {!src ? (
            <Box opacity={1}>
              <AccountCircleIcon color="white" size={120} />
            </Box>
          ) : null}
        </Flex>
      );
    }}
  </Consumer>
);

const Section = ({ ...rest }) => (
  <Flex color="blue.dark" flexDirection="column" px={4} borderBottom="1px solid" borderColor="blue.mid" {...rest} />
);

const UserCard = ({ profile: { name, description, account, apps }, zone_file, id, owner_address, ...rest }) => {
  const { target: zone_file_url } = zone_file.uri[0];
  return (
    <Card>
      <Section py={6} textAlign="center" justifyContent="center" alignItems="center">
        <Avatar mb={5} />
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
              <SocialBar pt={4} account={account} />
            </Box>
          )}
      </Section>
      <Section pb={4}>
        <SubSection label="Blockstack ID">
          <Type>{id}</Type>
        </SubSection>
        <SubSection label="Owner Address">
          <Type fontFamily="brand">{owner_address}</Type>
        </SubSection>
      </Section>
      <Section py={4}>
        <AppsBar apps={apps} />
      </Section>
      <Section py={4}>
        <Button is="a" href={zone_file_url} target={'_blank'}>
          View Raw Zone File
        </Button>
      </Section>
    </Card>
  );
};

class NamesSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const name = req && req.params ? req.params.name : query.name;
    const data = await fetchName(name);
    const appData = await fetch('https://app-co-api.herokuapp.com/api/apps');
    const apps = await appData.json();
    return {
      user: {
        id: name,
        ...data,
      },
      apps,
      meta: {
        title: name,
      },
    };
  }

  render() {
    return (
      <Box p={5} flexDirection="row" width={1}>
        <Box width={'400px'}>
          <UserCard {...this.props.user} />
        </Box>
        <pre>
          <code>{JSON.stringify(this.props.user, null, 2)}</code>
        </pre>
      </Box>
    );
  }
}

export default NamesSinglePage;
