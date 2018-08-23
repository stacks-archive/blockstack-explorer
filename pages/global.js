import React from 'react';
import { Flex, Box } from 'grid-styled';
import { Text } from 'rebass';
import Typography from '@material-ui/core/Typography';
// import ReactChartkick, { LineChart } from 'react-chartkick';
// import Chart from 'chart.js';
// import { Line as LineChart } from 'react-chartjs';
import {
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip as TooltipContainer,
} from 'recharts';
import accounting from 'accounting';
import moment from 'moment';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import Head from '../components/head';
import Nav from '../components/nav';
import Tooltip from '../components/tooltip';
import { Input } from '../styled/input';
import { Card } from '../styled/card';

import { fetchTotals } from '@client/api';

class Global extends React.Component {
  static propTypes = {
    totals: PropTypes.object.isRequired,
  };

  state = {
    stacksUSD: 0.12,
  };

  static async getInitialProps() {
    const totals = await fetchTotals();
    return {
      totals,
    };
  }

  convertedTotals() {
    const { totals } = this.props;
    const { stacksUSD } = this.state;
    const { cumulativeVestedAtBlocks } = totals;
    const converted = [];
    Object.keys(cumulativeVestedAtBlocks).forEach((block) => {
      const total = cumulativeVestedAtBlocks[block];
      const USD = total * stacksUSD * 10e-6;
      // console.log(total, USD);
      converted.push({
        block: parseInt(block, 10),
        usd: USD,
        usdFormatted: accounting.formatMoney(USD),
      });
      // converted[block] = USD;
    });
    return {
      ...totals,
      convertedCumulative: converted,
    };
  }

  render() {
    const totals = this.convertedTotals();
    return (
      <>
        <Head />
        <Nav />
        <Flex flexWrap="wrap">
          <Box width={1 / 2} p={3}>
            <Card>
              <Typography variant="body1" gutterBottom>
                Enter a conversion rate of Stacks per USD.
              </Typography>
              <Input value={this.state.stacksUSD} onChange={(evt) => this.setState({ stacksUSD: evt.target.value })} />
            </Card>
            <br />
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
                <Typography variant="button">{accounting.formatNumber(totals.vestedValues * 10e-6)} STACKS</Typography>
                <Typography variant="button">
                  {accounting.formatMoney(totals.vestedValues * 10e-6 * this.state.stacksUSD)} USD
                </Typography>
              </Typography>

              <Typography variant="body1" gutterBottom>
                Total accounts:
                <Typography variant="button">{totals.addressCount}</Typography>
              </Typography>
            </Card>
          </Box>
          <Box width={1 / 2} p={3}>
            <Card>
              <Text textAlign="center">Vesting Over Time</Text>
              <ResponsiveContainer height={500}>
                <LineChart data={totals.convertedCumulative} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                  <XAxis
                    dataKey="block"
                    type="number"
                    tickFormatter={(block) => moment(block).format('YYYY/MM/DD')}
                    domain={['dataMin', 'dataMax']}
                    label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
                  />
                  <Line dataKey="usd" />
                  <TooltipContainer content={Tooltip} />
                  <YAxis
                    tickFormatter={(usd) => numeral(usd).format('0a')}
                    label={{ value: 'Market Cap ($USD)', angle: -90, position: 'insideLeft', offset: -5 }}
                  />
                  <CartesianGrid />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Box>
        </Flex>
      </>
    );
  }
}

export default Global;
