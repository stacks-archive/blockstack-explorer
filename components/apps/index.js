import React from 'react';
import { Flex } from 'blockstack-ui';
import { extractRootDomain, uniq } from '@common';
import { Consumer } from '@pages/_app';

const AppItem = ({ slug, image, ...rest }) => (
  <Flex
    is={slug ? 'a' : 'div'}
    href={`https://app.co/app/${slug}`}
    target="_blank"
    mr={2}
    bg="blue.dark"
    mb={2}
    size={42}
    backgroundImage={`url(${image})`}
    borderRadius={10}
    backgroundSize="cover"
    alignItems="center"
    justifyContent="center"
    color="white"
    fontWeight={500}
    boxShadow="general"
    {...rest}
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
  return {
    apps: uniq(applist),
    unlisted: appsNotOnAppco,
  };
};

const ConnectedAppsList = ({ apps, wrapper, ...rest }) => (
  <Consumer>
    {() => {
      if (!apps)
        return console.log('Make sure you use this component on a page that is fetching data from App.co!') || null;
      // const { apps: appsList, unlisted } = getAppsArray(apps, userApps);
      const { listed, unlisted } = apps;
      console.log(apps);
      if (listed.length) {
        const children = (
          <Flex flexWrap="wrap" {...rest}>
            {listed.map(({ imgixImageUrl, name, slug, id }) => (
              <AppItem slug={slug} title={name} image={imgixImageUrl} key={id} />
            ))}
            {unlisted && unlisted.length !== 0 && <AppItem>{`+${unlisted.length}`}</AppItem>}
          </Flex>
        );

        return wrapper ? wrapper({ children }) : children;
      }
      return null;
    }}
  </Consumer>
);
export { ConnectedAppsList };
