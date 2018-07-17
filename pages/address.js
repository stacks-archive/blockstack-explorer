import React from 'react';
import Link from 'next/link'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Head from '../components/head'
import Nav from '../components/nav'

import { Card } from '../styled/card';

import { doSelectAccount } from '@stores/accounts/actions';

ReactChartkick.addAdapter(Chart)

class Address extends React.Component {
  static getInitialProps({ req, reduxStore }) {
    const {
      params: { address },
    } = req;

    reduxStore.dispatch(doSelectAccount(address));

    return { address };
  }

  render() {
    const { account, address } = this.props;

    return (
      <>
        <Head title="Account" />
        <Nav />
        <br/>
        {account ? (
          <Flex flexWrap="wrap">
            <Box width={[1, 1, 1/2]} p={3}>
              <Card>
                <Typography variant="display1" gutterBottom>Account Details</Typography>
                <Typography variant="button" gutterBottom>{account.address}</Typography>

                <Typography variant="body1" gutterBottom>
                  Balance:
                <Typography variant="button">{account.value} STACKS</Typography>
                </Typography>

                <Typography variant="body1" gutterBottom>
                  Vesting Total:
                <Typography variant="button">{account.vesting_total} STACKS</Typography>
                </Typography>

                <Typography variant="body1" gutterBottom>
                  Balance after vesting:
                <Typography variant="button">{account.vesting_total + account.value} STACKS</Typography>
                </Typography>
              </Card>
            </Box>
            <Box width={[1, 1, 1/2]} p={3}>
              <Card>
                <Typography variant="title" align="center">
                  Token Vesting
                </Typography>
                <LineChart data={account.vesting} xtitle="Block Height" ytitle="Tokens Received" />
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
    )
  }
}


const mapStateToProps = (state) => ({
  account: state.accounts.selectedAccount,
  address: state.accounts.selectedAddress,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps)(Address);