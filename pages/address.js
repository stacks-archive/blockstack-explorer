import React from 'react';
import Link from 'next/link'
import { withRouter } from 'next/router'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Head from '../components/head'
import Nav from '../components/nav'

import { Card } from '../styled/card';

class Address extends React.Component {
  render() {
    const { address } = this.props.router.query;
    console.log(this.props);
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
        </Grid>
      </>
    )
  }
}

export default withRouter(Address);