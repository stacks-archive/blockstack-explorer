import React from 'react';
import { Flex, Box } from 'blockstack-ui';
import { Text, Button } from 'rebass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';

import Head from '@components/head';
import Card from '@styled/card';
import { Input } from '@styled/input';

import { Actions as AuthActions } from '@stores/auth';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasSubmitted) {
      Router.push('/app');
    }
  }

  submit(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    // console.log(this);
    this.props.submitAuth(username, password);
  }

  render() {
    const { isSubmitting, hasSubmitted, authFailed } = this.props;
    return (
      <>
        <Head />
        <Flex flexWrap="wrap">
          <Box width={1 / 2} p={3} mx="auto" mt={3}>
            <Card textAlign="center">
              <Card.Content>
                <Text fontSize={3}>Login</Text>
                {!isSubmitting &&
                  !hasSubmitted && (
                    <form onSubmit={(evt) => this.submit(evt)}>
                      {authFailed && (
                        <Text color="red" mt={2}>
                          Authentication failed
                        </Text>
                      )}
                      <Input
                        value={this.state.username}
                        placeholder="Username"
                        mt={3}
                        autoComplete="username"
                        onChange={(evt) => this.setState({ username: evt.target.value })}
                      />
                      <Input
                        value={this.state.password}
                        placeholder="Password"
                        type="password"
                        mt={3}
                        autoComplete="current-password"
                        onChange={(evt) => this.setState({ password: evt.target.value })}
                      />
                      <Button mt={3} width={1}>
                        Submit
                      </Button>
                    </form>
                  )}
                {isSubmitting && <Text>Submitting...</Text>}
              </Card.Content>
            </Card>
          </Box>
        </Flex>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AuthActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
