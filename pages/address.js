import React from 'react';
import { Flex, Box, Text } from 'rebass';
import PropTypes from 'prop-types';
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
import numeral from 'numeral';

import Head from '../components/head';
import Nav from '../components/nav';
import Tooltip from '../components/tooltip';
import Footer from '../components/footer';
import { Input } from '../styled/input';
import { Type } from '@styled/typography';

import Card from '../styled/card';
import Wrap from '../styled/wrap';
import { fetchAccount } from '@client/api';

class Address extends React.Component {
  static propTypes = {
    account: PropTypes.object,
    address: PropTypes.string.isRequired,
  };

  static defaultProps = {
    account: null,
  };

  state = {
    stacksUSD: 0,
  };

  static async getInitialProps({ req }) {
    const {
      params: { address },
    } = req;

    const account = await fetchAccount(address);

    return { address, account };
  }

  convertedTotals() {
    const { cumulativeVestedAtBlocks } = this.props.account;
    const { stacksUSD } = this.state;
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
    return converted;
  }

  render() {
    const { account, address } = this.props;

    return (
      <Wrap>
        <Wrap.Inner>
          <Head title="Address" />
          <Nav global={!!account} />
          <br />
          {account ? (
            <Flex flexWrap="wrap" justifyContent="center">
              <Box width={[1, 1, 3 / 4]} pt={4}>
                <Card>
                  <Card.Header>
                    <Type.h3 color="#fff">Address Details</Type.h3>
                  </Card.Header>
                  <Card.Content>
                    <Type.p fontSize="15px" fontWeight={500} mb={0} mt={2}>
                      Stacks address
                    </Type.p>
                    <Type.p fontSize="23px" mt={2}>
                      {account.address}
                    </Type.p>

                    <Type.p fontSize="15px" fontWeight={500} mb={0} mt={4}>
                      Total Stacks tokens owned by this address
                    </Type.p>
                    <Type.p fontSize="23px" mt={1}>
                      {accounting.formatNumber(account.vesting_total * 10e-7)}
                    </Type.p>

                    <Type.p fontSize="15px" fontWeight={500} mb={0} mt={4}>
                      Your ability to transfer tokens unlocks on
                    </Type.p>

                    <Type.p fontSize="23px" mt={1} mb={0}>
                      Approximately{' '}
                      {moment(account.transferUnlockDate)
                        .utcOffset('-05:00')
                        .format('dddd, MMMM Do YYYY')}
                    </Type.p>

                    <Type.p fontSize="12px" mb={2} mt={1}>
                      (The exact time depends on the respective block confirmation on the blockchain.)
                    </Type.p>
                  </Card.Content>
                </Card>
              </Box>
              <Box width={[1, 1, 3 / 4]} pt={4} pb={5}>
                <Card>
                  <Card.Header>
                    <Type.h3 color="#fff">Unlocking Visualization Tool</Type.h3>
                  </Card.Header>
                  <Card.Content>
                    <Type.p>This tool shows how your Stacks tokens will unlock over time.</Type.p>
                    <Type.p>
                      Enter a conversion rate in the field below to see the USD equivalent of your Stacks.
                    </Type.p>
                    <Type.p>Enter a conversion rate of USD per Stack token.</Type.p>
                    <Input
                      value={this.state.stacksUSD}
                      mb={5}
                      onChange={(evt) => this.setState({ stacksUSD: evt.target.value })}
                    />
                    <Type.p textAlign="center">Vesting Over Time</Type.p>
                    <ResponsiveContainer height={500}>
                      <LineChart data={this.convertedTotals()} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                        <XAxis
                          dataKey="block"
                          type="number"
                          tickFormatter={(block) => moment(block).format('MM/DD/YYYY')}
                          domain={['dataMin', 'dataMax']}
                          label={{ value: 'Date', position: 'insideBottom', offset: -25 }}
                        />
                        <Line dataKey="usd" />
                        <TooltipContainer content={Tooltip} />
                        <YAxis
                          tickFormatter={(usd) => numeral(usd).format('0a')}
                          label={{ value: 'Account Balance ($USD)', angle: -90, position: 'insideLeft', offset: -10 }}
                        />
                        <CartesianGrid />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>
              </Box>
            </Flex>
          ) : (
            <Flex>
              <Box width={1} m={4}>
                <Type.h1 textAlign="center">Sorry, no account was found with the address:</Type.h1>
                <Type.h3 textAlign="center">
                  <code>{address}</code>
                </Type.h3>
              </Box>
            </Flex>
          )}
          <Wrap.Push />
        </Wrap.Inner>
        <Footer />
      </Wrap>
    );
  }
}

export default Address;
