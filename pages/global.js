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
import Card from '../styled/card';
import { Type } from '../styled/typography';
import Wrap from '../styled/wrap';
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
      <Wrap>
        <Wrap.Inner>
          <Head />
          <Nav />
          <Flex flexWrap="wrap" justifyContent="center">
            <Box width={[1, 1, 1 / 4]} pt={5}>
              <Card>
                <Card.Header>
                <Type.h3 color="#fff">Global Statistics</Type.h3>
                </Card.Header>
                <Card.Content>
                <Type.p fontSize="15px" fontWeight={500} mb={0} mt={2}>
                  Total
                </Type.p>
                <Type.p fontSize="23px" mt={2} mb={2}>{accounting.formatNumber(totals.vestedValues * 10e-7)} STACKS</Type.p>
                <Type.p fontSize="23px" mt={0}>{accounting.formatMoney(totals.vestedValues * 10e-7 * this.state.stacksUSD, '$', 0)} USD</Type.p>

                <Type.p fontSize="15px" fontWeight={500} mb={0} mt={2}>
                  Total accounts
                </Type.p>
                <Type.p fontSize="23px" mt={2}>{totals.addressCount}</Type.p>
                </Card.Content>
              </Card>
              <br />
              <Card>
                <Card.Content>
                  <Type.p>Enter a conversion rate of USD per Stack token.</Type.p>
                  <Input value={this.state.stacksUSD} onChange={(evt) => this.setState({ stacksUSD: evt.target.value })} />
                </Card.Content>
              </Card>
            </Box>
            <Box width={[1, 1, 2 / 4]} pt={5} pl={4} pb={5}>
              <Card>
                <Card.Content>
                  <Text textAlign="center">Vesting Over Time</Text>
                  <ResponsiveContainer height={500}>
                    <LineChart data={totals.convertedCumulative} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                      <XAxis
                        dataKey="block"
                        type="number"
                        tickFormatter={(block) => moment(block).format('MM/DD/YYYY')}
                        domain={['dataMin', 'dataMax']}
                        label={{ value: 'Date', position: 'insideBottom', offset: -23 }}
                      />
                      <Line dataKey="usd" />
                      <TooltipContainer content={Tooltip} />
                      <YAxis
                        tickFormatter={(usd) => numeral(usd).format('0a')}
                        label={{ value: 'Market Cap ($USD)', angle: -90, position: 'insideLeft', offset: -18 }}
                      />
                      <CartesianGrid />
                    </LineChart>
                  </ResponsiveContainer>


                  <Type.p fontSize="15px" pt={3}>
                    The above tool shows the market cap for tokens released in the Genesis Block only. The mining process, when turned on, will release more tokens. See the <a href="https://blockstack.org/tokenpaper.pdf">Blockstack Token Whitepaper</a> for details.
                  </Type.p>
                </Card.Content>
              </Card>
            </Box>
          </Flex>
          <Wrap.Push></Wrap.Push>
        </Wrap.Inner>
        <Footer />
      </Wrap>
    );
  }
}

export default Global;
