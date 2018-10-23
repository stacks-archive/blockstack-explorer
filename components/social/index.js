import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import {
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
const Social = ({ account: accounts, ...rest }) => {
  if (!accounts || (accounts && !accounts.length)) return null;
  const itemsWithProofs = [...accounts.filter((item) => item.proofUrl !== '')];
  return (
    <Flex {...rest}>
      {accounts.map((item) => (
        <SocialItem {...item} />
      ))}
    </Flex>
  );
};

export { Social };
