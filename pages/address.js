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
        usdFormatted: accounting.formatMoney(USD),
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
        <Nav />
        <br />
        {account ? (
          <Flex flexWrap="wrap">
            <Box width={1} p={3}>
              <Card>
                <Type.h1 mb={3}>Investment Details</Type.h1>

                <Type.p fontSize="12px" mb={0} mt={3}>
                  STACKS Address:
                </Type.p>
                <code>{account.address}</code>

                <Type.p fontSize="12px" mb={0} mt={4}>
                  Total STACKS purchased:
                </Type.p>
                <code>{accounting.formatNumber(account.vesting_total * 10e-7)}</code>

                <Type.p fontSize="12px" mb={0} mt={3}>
                  Your ability to transfer tokens unlocks on:
                </Type.p>
                <Type.p mb={0} mt={1}>
                  <code>{moment(account.transferUnlockDate).format('dddd, MMMM Do YYYY')}</code>
                </Type.p>
                <Type.p mb={0} mt={1}>
                  <code>Bitcoin Block #{account.lock_send}</code>
                </Type.p>

                {/* <Typography variant="body1" gutterBottom>
                  Vesting Total:
                  <Typography variant="button">
                    {accounting.formatNumber(account.vesting_total * 10e-7)} STACKS
                  </Typography>
                  <Typography variant="button">
                    {accounting.formatMoney(account.vesting_total * 10e-7 * this.state.stacksUSD)} USD
                  </Typography>
                </Typography> */}
              </Card>
            </Box>

            <Box width={[1]} p={3}>
              <Card mb={1}>
                <Type.h2>Vesting Visualization Tool</Type.h2>
                <Type.p>This tool shows how your STACKS will vest over time.</Type.p>
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
                      tickFormatter={(block) => moment(block).format('YYYY/MM/DD')}
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
      </>
    );
  }
}

export default Address;
