import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Flex, Box } from 'grid-styled';

import Head from '../components/head';
import Nav from '../components/nav';

import { Card } from '../styled/card';

const accountRow = (account) => (
  <TableRow key={account.address}>
    <Link href={`/address/${account.address}`}>
      <TableCell>
        <a href={`/address/${account.address}`}>{account.address}</a>
      </TableCell>
    </Link>
    <TableCell>{account.value}</TableCell>
    <TableCell>{account.vesting_total}</TableCell>
  </TableRow>
);

const Home = ({ accounts }) => {
  const accountRows = [];
  Object.keys(accounts).forEach((address) => {
    const account = accounts[address];
    accountRows.push(accountRow(account));
  });
  return (
    <div>
      <Head title="Home" />
      <Nav />
      <Flex>
        <Box width={1} m={3}>
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>Initial Value</TableCell>
                  <TableCell>Vesting Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{accountRows}</TableBody>
            </Table>
          </Card>
        </Box>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts.accountsByAddress,
});

export default connect(mapStateToProps)(Home);
