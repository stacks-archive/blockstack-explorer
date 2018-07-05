import React from 'react';
import Link from 'next/link'
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Head from '../components/head'
import Nav from '../components/nav'

import { Card } from '../styled/card';

ReactChartkick.addAdapter(Chart)

class Address extends React.Component {
  static getInitialProps({ req, reduxStore }) {
    const {
      params: { address },
    } = req;

    return { address };
  }

  render() {
    const { address } = this.props;

    return (
      <>
        <Head title="Address" />
        <Nav />
        <br/>
        <Grid container>
          <Grid item xs={6}>
            <Card>
              <Typography variant="display1" gutterBottom>Address Details</Typography>
              <Typography variant="button" gutterBottom>{address}</Typography>
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

export default Address;