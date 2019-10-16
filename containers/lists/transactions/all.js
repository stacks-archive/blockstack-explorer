import React from 'react';
// import Link from 'next/link';
import { Flex, Button } from 'blockstack-ui';
// import { Toggle } from 'react-powerplug';
// import moment from 'moment';
// import { ChevronDownIcon, ChevronUpIcon } from 'mdi-react';
import { Card } from '@components/card';
// import { List } from '@components/list';
// import { Time } from '@components/time';
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
