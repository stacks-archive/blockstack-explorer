import React from 'react';
import styled from 'styled-components';
import { Card, Box } from 'blockstack-ui';

Card.HeaderBig = styled(Box)`
  margin: 0;
  padding: 30px 60px;
  background-color: rgb(32, 12, 43);
  color: #fff;
`;

Card.Header = styled(Box)`
  margin: 0;
  padding: 20px 40px;
  background-color: rgb(32, 12, 43);
  color: #fff;
`;

Card.Content = styled(Box)`
  padding: 40px;
`;

export default Card;
