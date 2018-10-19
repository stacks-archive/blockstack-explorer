import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withReduxStore from '../lib/with-redux-store';
import { theme } from 'blockstack-ui';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRouter(withReduxStore(MyApp));
