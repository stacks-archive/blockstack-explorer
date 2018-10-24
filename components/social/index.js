import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import {
  TwitterIcon,
  LinkedinBoxIcon,
  GithubCircleIcon,
  HackernewsIcon,
  InstagramIcon,
  SshIcon,
  BitcoinIcon,
  EthereumIcon,
  FacebookBoxIcon,
  LockIcon,
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
      return SshIcon;
    case 'instagram':
      return InstagramIcon;
    case 'bitcoin':
      return BitcoinIcon;
    case 'ethereum':
      return EthereumIcon;
    case 'facebook':
      return FacebookBoxIcon;
    case 'pgp':
      return LockIcon;
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
      {itemsWithProofs.map((item) => (
        <SocialItem {...item} />
      ))}
    </Flex>
  );
};

const NonSocialItems = ({ wrapper, account: accounts, ...rest }) => {
  if (!accounts || (accounts && !accounts.length)) return null;
  const itemsWithoutProofs = [...accounts.filter((item) => item.proofUrl === '')];
  const children =
    itemsWithoutProofs && itemsWithoutProofs.length ? (
      <Box {...rest}>
        {itemsWithoutProofs.map(
          (item) =>
            item.identifier ? (
              <Flex alignItems={'center'} justifyContent="space-between" pb={2}>
                <SocialItem {...item} />
                <Box p={1} overflow="auto" width={1} maxWidth={'calc(100% - 38px)'}>
                  <Type fontFamily={'brand'}>{item.service === 'pgp' ? 'PGP Keys' : item.identifier}</Type>
                </Box>
              </Flex>
            ) : null,
        )}
      </Box>
    ) : null;
  return itemsWithoutProofs && itemsWithoutProofs.length ? wrapper({ children }) : null;
};

export { Social, NonSocialItems };
