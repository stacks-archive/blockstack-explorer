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

import { Card } from '../styled/card';

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
    const convertedCumulative = this.convertedTotals();

    return (
      <>
        <Head title="Address" />
        <Nav global />
        <br />
        {account ? (
          <Flex flexWrap="wrap">
            <Box width={1} p={3}>
              <Card>
                <Type.h1 mb={3}>Address Details</Type.h1>

                <Type.p fontSize="12px" mb={0} mt={3}>
                  Stacks tokens Address:
                </Type.p>
                <code>{account.address}</code>

                <Type.p fontSize="12px" mb={0} mt={4}>
                  Total Stacks tokens owned by this address:
                </Type.p>
                <code>{accounting.formatNumber(account.vesting_total * 10e-7)}</code>

                <Type.p fontSize="12px" mb={0} mt={3}>
                  Your ability to transfer tokens unlocks on:
                </Type.p>
                <Type.p mb={0} mt={1}>
                  <code>
                    Approximately{' '}
                    {moment(account.transferUnlockDate)
                      .utcOffset('-05:00')
                      .format('dddd, MMMM Do YYYY')}
                  </code>
                </Type.p>
                <Type.p fontSize="12px" mb={0} mt={1}>
                  (The exact time depends on the respective block confirmation on the blockchain.)
                </Type.p>
              </Card>
            </Box>

            <Box width={[1]} p={3}>
              <Card mb={1}>
                <Type.h2>Unlocking Visualization Tool</Type.h2>
                <Type.p>This tool shows how your Stacks tokens will unlock over time.</Type.p>
                <Type.p>Enter a conversion rate in the field below to see the USD equivalent of your Stacks.</Type.p>
                <Type.p>Enter a conversion rate of Stacks per USD.</Type.p>
                <Input
                  value={this.state.stacksUSD}
                  mb={5}
                  onChange={(evt) => this.setState({ stacksUSD: evt.target.value })}
                />
                <Type.p textAlign="center">Vesting Over Time</Type.p>
                <ResponsiveContainer height={500}>
                  <LineChart data={convertedCumulative} margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
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
                      label={{ value: 'Account Balance ($USD)', angle: -90, position: 'insideLeft', offset: -5 }}
                    />
                    <CartesianGrid />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Box>
          </Flex>
        ) : (
          <Flex>
            <Box width={1} m={4}>
              <Typography align="center" variant="display1">
                Sorry, no account was found with the address:
                <Typography variant="button">{address}</Typography>
              </Typography>
            </Box>
          </Flex>
        )}
        <Footer />
      </>
    );
  }
}

export default Address;
