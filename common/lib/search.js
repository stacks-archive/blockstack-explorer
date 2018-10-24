import Router from 'next/router';
import { fetchSearch } from '@common/lib/client/api';

// Take a free-form search query (from the navigation),
// and redirect the user to the right page
export const search = async (query) => {
  const blockstackID = /^([A-Za-z0-9_]+\.){1,2}[A-Za-z0-9_]+$/;

  if (blockstackID.test(query)) {
    Router.push(
      {
        pathname: '/names/single',
        query: {
          name: query,
        },
      },
      `/names/${query}`,
    );
  }

  const searchData = await fetchSearch(query);

  if (searchData.success === false) {
    return null;
  }

  const { pathname, as, ...rest } = searchData;

  Router.push(
    {
      pathname,
      query: rest,
    },
    as,
  );
};

export default search;
