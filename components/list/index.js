import React from 'react';
import { Card } from '@components/card';
import { Item } from '@components/list/item';

const List = ({ title, actions, children, headerProps, ...rest }) => (
  <Card flexGrow={1} p={0} fontWeight={500} mr={[0, 5]} {...rest}>
    <Card.Header title={title} actions={actions} {...headerProps} />
    {children}
  </Card>
);

List.Item = Item;

export { List };
