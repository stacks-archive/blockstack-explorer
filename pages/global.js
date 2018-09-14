import React from 'react';
import { Flex, Box } from 'grid-styled';
import { Text } from 'rebass';
import Typography from '@material-ui/core/Typography';
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
import Footer from '../components/footer';
import { Input } from '../styled/input';
import { Card } from '../styled/card';
import { Type } from '../styled/typography';

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
      const USD = total * stacksUSD * 10e-7;
      // console.log(total, USD);
      converted.push({
        block: parseInt(block, 10),
        usd: USD,
        stacks: accounting.formatNumber(total * 10e-7),
        usdFormatted: accounting.formatMoney(USD, '$', 0),
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
          <Box width={[1, 1, 1 / 2]} p={3}>
            <Card>
              <Type.p>Enter a conversion rate of Stacks per USD.</Type.p>
              <Input value={this.state.stacksUSD} onChange={(evt) => this.setState({ stacksUSD: evt.target.value })} />
            </Card>
            <br />
            <Card>
              <Type.h1>Global Statistics</Type.h1>

              <Type.p fontSize="12px" mb={0} mt={3}>
                Total:
              </Type.p>
              <code>{accounting.formatNumber(totals.vestedValues * 10e-7)} STACKS</code>
              <br />
              <code>{accounting.formatMoney(totals.vestedValues * 10e-7 * this.state.stacksUSD, '$', 0)} USD</code>

              <Type.p fontSize="12px" mb={0} mt={3}>
                Total accounts:
              </Type.p>
              <code>{totals.addressCount}</code>
            </Card>
          </Box>
          <Box width={[1, 1, 1 / 2]} p={3}>
            <Card>
              <Text textAlign="center">Vesting Over Time</Text>
              <ResponsiveContainer height={500}>
                <LineChart data={totals.convertedCumulative} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
                  <XAxis
                    dataKey="block"
                    type="number"
                    tickFormatter={(block) => moment(block).format('MM/DD/YYYY')}
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
              <Type.p mt={3}>
                The above tool shows the market cap for tokens released in the genesis block only. The mining process,
                when turned on, will release more tokens. See the{' '}
                <a href="https://blockstack.org/tokenpaper.pdf">Blockstack tokenpaper</a> for details.
              </Type.p>
            </Card>
          </Box>
        </Flex>
        <Footer />
      </>
    );
  }
}

export default Global;
