import React from 'react';
import TimeAgo from 'react-timeago';
import moment from 'moment';

import { Tooltip } from '@components/tooltip';

const Time = ({ date, tooltip = true }) => {
  const value = new Date(date * 1000);
  if (!tooltip) {
    return <TimeAgo date={value} />;
  }
  return (
    <Tooltip text={moment(value).format('DD MMMM YYYY HH:MM')}>
      <TimeAgo date={value} />
    </Tooltip>
  );
};

export { Time };
