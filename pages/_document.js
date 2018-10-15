import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { injectGlobal, ServerStyleSheet } from 'styled-components';
import { normalize } from 'polished';

import fonts from '../lib/fonts';

/**
 * Reset our styles
 */
injectGlobal`
${normalize()};
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500,Roboto:400,700');
@font-face {
  font-family: "Futura Heavy";
  src: url(/static/assets/fonts/futura-heavy.ttf);
}
body, html{
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background:#eeefef;
  height:100%;
  margin:0;
}
#__next{
  height:100%;
  margin:0;
}
a {
  text-decoration: none;
}
// h1, h2, h3, h4, h5, h6{
//   font-family: 'Plex';
//   margin: 0;
//   padding: 0;
// }
${fonts}
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
