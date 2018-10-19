import React from 'react';
import moment from 'moment';
import { Text } from 'rebass';
import { Tooltip } from '@styled/tooltip';

export default ({ payload }) => {
  const data = payload[0] && payload[0].payload;
  if (!data) {
    return <div />;
  }
  return (
    <Tooltip>
      <Text>
        {moment(data.block)
          .utcOffset('-05:00')
          .format('MM/DD/YYYY')}
      </Text>
      <Text>{data.usdFormatted}</Text>
      <Text>{data.stacks} Stacks</Text>
    </Tooltip>
  );
};
