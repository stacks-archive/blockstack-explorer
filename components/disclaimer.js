import React from 'react';
import { Type } from '@styled/typography';

const Disclaimer = ({ global = false }) => (
  <Type.p fontSize="15px" pt={3}>
    <Type.strong>Disclaimer:</Type.strong>{' '}
    <Type.span style={{ fontStyle: 'italic' }}>
      The data here are based on prices for the tokens as inputted by users into this projection tool and may not
      reflect their current pricing or any market data, which may be higher or lower than what is shown here. There is
      no guarantee that the market cap shown will be in existence at any particular time, or that Stacks Tokens can be
      sold at a price that is more advantageous or disadvantageous for a particular buyer at any particular point in
      time.
      <br />
      <br />
      No graph, chart, or formula can in and of itself determine which securities or other investments to buy or sell or
      when to buy or sell them. Potential investors should not rely on this or any other graph when making such
      determinations.
      {global && (
        <>
          <br />
          <br />
          The above tool shows the market cap for tokens released in the Genesis Block only. The mining process, when
          turned on, will release more tokens. See the{' '}
          <a href="https://blockstack.org/tokenpaper.pdf">Blockstack Token Whitepaper</a> for details.
        </>
      )}
    </Type.span>
  </Type.p>
);

export default Disclaimer;
