import React from 'react';

import TimeAgo from 'react-timeago';

const Time = ({ date }) => {
  const value = new Date(date * 1000);
  return <TimeAgo date={value} />;
};

export { Time };
