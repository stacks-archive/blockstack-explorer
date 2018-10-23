import React from 'react';
import { Flex, Box, Type, Button } from 'blockstack-ui';
import { extractRootDomain, uniq } from '@lib/common';
import { Consumer } from '@pages/_app';

const AppItem = ({ slug, image, ...rest }) => (
  <Box
    is="a"
    href={`https://app.co/app/${slug}`}
    target="_blank"
    mr={2}
    bg={'blue.mid'}
    mb={2}
    size={42}
    backgroundImage={`url(${image})`}
    borderRadius={10}
    backgroundSize="cover"
  />
);

const getAppsArray = (apps, userApps) => {
  const blockstackApps = apps.apps.filter(({ authentication }) => authentication === 'Blockstack');
  const domains = Object.keys(userApps).map((domain) => extractRootDomain(domain));
  const applist = [];
  domains.forEach((domain) => {
    const app = blockstackApps.find((appco) => appco.website.includes(domain));
    if (app) applist.push(app);
  });

  return uniq(applist);
};

const ConnectedAppsList = ({ ...rest }) => (
  <Consumer>
    {({ apps, user }) => {
      if (!apps)
        return console.log('Make sure you use this component on a page that is fetching data from App.co!') || null;
      if (!user.profile.apps) return null;
      const appsList = getAppsArray(apps, user.profile.apps);
      if (appsList.length) {
        return (
          <Flex flexWrap="wrap" {...rest}>
            {appsList.map(({ imgixImageUrl, name, Slugs }) => (
              <AppItem slug={Slugs[0].value} title={name} image={imgixImageUrl} />
            ))}
          </Flex>
        );
      }
      return null;
    }}
  </Consumer>
);
export { ConnectedAppsList };
