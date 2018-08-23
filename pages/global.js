import React from 'react';
import { Flex, Box } from 'grid-styled';
import Typography from '@material-ui/core/Typography';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import Head from '../components/head';
import Nav from '../components/nav';
import { Card } from '../styled/card';

import { fetchTotals } from '@client/api';

ReactChartkick.addAdapter(Chart);

class Global extends React.Component {
  static async getInitialProps() {
    const totals = await fetchTotals();
    return {
      totals,
    };
  }

  render() {
    const { totals } = this.props;
    return (
      <>
        <Head />
        <Nav />
        <Flex flexWrap="wrap">
          <Box width={1 / 2} p={3}>
            <Card>
              <Typography variant="display1" gutterBottom>
                Global Statistics
              </Typography>
              <Typography variant="body1" gutterBottom>
                Initial Total:
                <Typography variant="button">{totals.initalValue} STACKS</Typography>
              </Typography>

              <Typography variant="body1" gutterBottom>
                Total from vesting:
                <Typography variant="button">{totals.vestedValues} STACKS</Typography>
              </Typography>

              <Typography variant="body1" gutterBottom>
                Total accounts:
                <Typography variant="button">{totals.addressCount}</Typography>
              </Typography>
            </Card>
          </Box>
          <Box width={1 / 2} p={3}>
            <Card>
              <LineChart data={totals.vestedAtBlocks} xtitle="Block Height" ytitle="Tokens Received" />
            </Card>
          </Box>
        </Flex>
      </>
    );
  }
}

export default Global;
