import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import Typography from '@material-ui/core/Typography';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import Head from '../components/head'
import Nav from '../components/nav'
import { Card } from '../styled/card';

ReactChartkick.addAdapter(Chart)

const getTotals = (accounts) => {
  const totals = {
    initalValue: 0,
    vestedValues: 0,
    vestedAtBlocks: {},
  };

  Object.keys(accounts).forEach(address => {
    const account = accounts[address];
    totals.initalValue += account.value;
    totals.vestedValues += account.vesting_total;
    Object.keys(account.vesting).forEach(block => {
      totals.vestedAtBlocks[block] = totals.vestedAtBlocks[block] || 0;
      totals.vestedAtBlocks[block] += account.vesting[block];
    })
  });

  return totals;
}

const Global = ({ totals }) => (
  <>
    <Head />
    <Nav />
    <Flex>
      <Box width={1/2} m={3}>
        <Card>
          <Typography variant="body1" gutterBottom>
            Initial Total:
            <Typography variant="button">{totals.initalValue} STACKS</Typography>
          </Typography>

          <Typography variant="body1" gutterBottom>
            Total from vesting:
            <Typography variant="button">{totals.vestedValues} STACKS</Typography>
          </Typography>
        </Card>
      </Box>
      <Box width={1/2} m={3}>
        <Card>
          <LineChart data={totals.vestedAtBlocks} xtitle="Block Height" ytitle="Tokens Received" />
        </Card>
      </Box>
    </Flex>
  </>
);

const mapStateToProps = (state) => ({
  accounts: state.accounts.accountsByAddress,
  totals: getTotals(state.accounts.accountsByAddress),
});

export default connect(mapStateToProps)(Global);