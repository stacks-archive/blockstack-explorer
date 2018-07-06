import React from 'react';
import Link from 'next/link'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import { connect } from 'react-redux';

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
    const { account } = this.props;

    return (
      <>
        <Head title="Account" />
        <Nav />
        <br/>
        <Grid container>
          <Grid item xs={6}>
            <Card>
              <Typography variant="display1" gutterBottom>Account Details</Typography>
              <Typography variant="button" gutterBottom>{account.address}</Typography>
              <Typography variant="body1" gutterBottom>
                Balance: 
                <Typography variant="button">1144.013 STX</Typography>
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <LineChart />
          </Grid>
        </Grid>
      </>
    )
  }
}


const mapStateToProps = (state) => ({
  account: state.accounts.selectedAccount,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AppStore.actions, UserStore.actions), dispatch);
}

export default connect(mapStateToProps)(Address);