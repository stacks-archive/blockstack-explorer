import React from 'react';
import { fetchTX } from '@common/lib/client/api';
import { TransactionCard } from '@containers/cards/transaction';
import { TransactionDetails } from '@containers/cards/transaction-details';
import { Page } from '@components/page';

class TransactionSinglePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const id = req && req.params ? req.params.tx : query.tx;
    const data = await fetchTX(id);

    return {
      tx: {
        id,
        ...data,
      },
      meta: {
        title: `Transaction: ${id}`,
      },
    };
  }

  render() {
    const { valueOut, confirmations, vin, vout, fees } = this.props.tx;
    return (
      <Page>
        <TransactionCard mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']} transaction={this.props.tx} />
        <Page.Main>
          <TransactionDetails confirmations={confirmations} fees={fees} valueOut={valueOut} vin={vin} vout={vout} />
        </Page.Main>
      </Page>
    );
  }
}
export default TransactionSinglePage;
