import React from 'react';
import { Flex, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import HistoryItem from './history-item';

const AllTransactionsList = ({ transactions, nextPage }) => (
  <Card width={1} mb={[5, 5, 0]} title="Names">
    {transactions.map((transaction) => (
      <HistoryItem transaction={transaction} />
    ))}
    <Flex py={4} justifyContent="center">
      <Button onClick={() => nextPage()}>View More</Button>
    </Flex>
  </Card>
);

export default AllTransactionsList;
