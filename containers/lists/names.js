import React from 'react';
import { List } from '@components/list';
import { Box } from 'blockstack-ui';
import { Consumer } from '@pages/_app';
import { Time } from '@components/time';

const Subtitle = ({ owner }) => {
  if (!owner) return '';
  return <List.Item.Subtitle overflow="auto">{`Owned by ${owner}`}</List.Item.Subtitle>;
};

const NamesList = ({ list, limit, ...rest }) => (
  <Consumer>
    {(context) => {
      if (!context) return null;
      const { nameOperations } = context;
      const array = list || nameOperations;
      if (!array) return null;
      const needToLimit = (index) => (limit ? !(index > limit) : true);
      return array.map(
        ({ name, owner, address, time }, i) =>
          needToLimit(i) && (
            <List.Item href={`/name/${name}`} className="names-list-item" key={name}>
              <Box maxWidth="100%" pr={2}>
                {name ? <List.Item.Title overflow="auto">{name}</List.Item.Title> : null}
                {address || owner ? <Subtitle owner={address || owner} /> : null}
              </Box>
              {time && (
                <List.Item.Subtitle>
                  <Time date={time} />
                </List.Item.Subtitle>
              )}
            </List.Item>
          ),
      );
    }}
  </Consumer>
);

export { NamesList };
