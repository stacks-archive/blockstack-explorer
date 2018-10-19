import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withReduxStore from '../lib/with-redux-store';
import { theme } from 'blockstack-ui';
import { Layout } from '@components/layout';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import fonts from '../lib/fonts';

/**
 * Reset our styles
 */
const Global = createGlobalStyle`
${normalize()};
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
body, html{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background: ${theme.colors.blue.light};
  height: 100%;
  margin: 0;
}
#__next{
  height:100%;
  margin:0;
}
a {
  text-decoration: none;
}
${fonts}
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    const { meta } = pageProps;

    return (
      <Container>
        <>
          <Global />
          <Provider store={reduxStore}>
            <ThemeProvider theme={theme}>
              <Layout meta={meta}>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Provider>
        </>
      </Container>
    );
  }
}

export default withRouter(withReduxStore(MyApp));
