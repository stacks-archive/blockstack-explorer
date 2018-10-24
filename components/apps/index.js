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
  const domains = Object.keys(userApps).map((domain) => extractRootDomain(domain));
  const applist = [];
  const appsNotOnAppco = [];
  domains.forEach((domain) => {
    const app = apps.find((appco) => appco.website.includes(domain));
    if (app) applist.push(app);
    if (!app) appsNotOnAppco.push(domain);
  });
  console.log(uniq(appsNotOnAppco));
  return uniq(applist);
};

const ConnectedAppsList = ({ wrapper, ...rest }) => (
  <Consumer>
    {({ apps, user }) => {
      if (!apps)
        return console.log('Make sure you use this component on a page that is fetching data from App.co!') || null;
      if (!user.profile.apps) return null;
      const appsList = getAppsArray(apps, user.profile.apps);
      const appsNotIncluded = appsList.length !== user.profile.apps.length;
      if (appsList.length) {
        const children = (
          <Flex flexWrap="wrap" {...rest}>
            {appsList.map(({ imgixImageUrl, name, Slugs }) => (
              <AppItem slug={Slugs[0].value} title={name} image={imgixImageUrl} />
            ))}
            {appsNotIncluded ? <AppItem /> : null}
          </Flex>
        );

        return wrapper ? wrapper({ children }) : children;
      }
      return null;
    }}
  </Consumer>
);
export { ConnectedAppsList };
