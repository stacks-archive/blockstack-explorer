import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { theme } from 'blockstack-ui';
import { Layout } from '@components/layout';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import fonts from '../lib/fonts';

const { Provider, Consumer } = React.createContext();

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
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      context: {
        ...pageProps,
      },
    };
  }

  render() {
    const { Component, pageProps, context } = this.props;
    const { meta } = pageProps;

    return (
      <Container>
        <>
          <Global />
          <Provider value={context}>
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

export { Consumer };

export default withRouter(MyApp);
