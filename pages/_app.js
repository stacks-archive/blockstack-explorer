import App, { Container } from 'next/app';
import React from 'react';
import { withRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import { theme } from 'blockstack-ui';
import { Layout } from '@components/layout';
import { createGlobalStyle } from 'styled-components';
import { normalize, darken } from 'polished';
import fonts from '../common/lib/fonts';
import NProgress from 'nprogress';
import Router from 'next/router';
const { Provider, Consumer } = React.createContext();
import { fetchBlockstackApps } from '@common/lib/client/api';

NProgress.configure({
  showSpinner: false,
  minimum: 0.3,
  easing: 'ease-in-out',
  speed: 300,
});

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
body{
  *{
    &::-webkit-scrollbar-thumb {
      background: ${darken(0.1, String(theme.colors.blue.mid))};
      border-radius: 4px;
    }
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      border-radius: 4px;
      background: ${theme.colors.blue.mid};
    }
  }
}
#__next{
  height:100%;
  margin:0;
}
a {
  text-decoration: none;
}
${fonts}
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: ${theme.colors.blue.accent};

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px ${theme.colors.blue.accent}, 0 0 5px ${theme.colors.blue.accent};
  opacity: 0.5;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: ${theme.colors.blue.accent};
  border-left-color: ${theme.colors.blue.accent};
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

let apps = null;

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (!apps) {
      apps = await fetchBlockstackApps();
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const props = {
      ...pageProps,
      apps,
    };

    return {
      pageProps: props,
      context: props,
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
            <ThemeProvider theme={{ ...theme, transitions: ['unset', '.34s all cubic-bezier(.19,1,.22,1)'] }}>
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
