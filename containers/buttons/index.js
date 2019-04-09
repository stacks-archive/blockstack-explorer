import React from 'react';
import { Button } from 'blockstack-ui';

const DatePickerButton = ({ onClick, size, ...rest }) => (
  <Button size={size} onClick={onClick}>
    Pick Date
  </Button>
);

export { DatePickerButton };
