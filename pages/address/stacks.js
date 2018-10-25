import React from 'react';
import { Flex, Box, Type } from 'blockstack-ui';
import QRCode from 'qrcode.react';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { List } from '@components/list/index';
import { fetchStacksAddress } from '@common/lib/client/api';
import { Input } from '@components/input';
import { Line as LineChart } from 'react-chartjs-2';

const Attribute = ({ label, value }) => (
  <Section.Subsection label={label}>
    <Box maxWidth="100%" overflow="auto">
      <Type fontFamily="brand">{value}</Type>
    </Box>
  </Section.Subsection>
);

const stacksValue = (value) => `${+`${Math.round(`${value * 10e-7}e+2`)}e-2`} Stacks`;

const txTitle = (tx) => {
  if (tx.operation === 'SENT') {
    return `Sent ${stacksValue(tx.tokensSent)}`;
  }
  if (tx.operation === 'RECEIVED') {
    return `Received ${stacksValue(tx.tokensSent)}`;
  }
  return tx.operation;
};

export default class StacksAddressPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const addr = req && req.params ? req.params.address : query.address;
    const address = await fetchStacksAddress(addr);
    return {
      address,
      meta: {
        title: `Stacks Address ${addr}`,
      },
    };
  }

  state = {
    STXUSD: '',
  };

  txList() {
    const { history } = this.props.address;
    return history.map((tx) => (
      <List.Item>
        <Box maxWidth="calc(100% - 105px)">
          <List.Item.Title>{txTitle(tx)}</List.Item.Title>
          <List.Item.Subtitle overflow="auto">{tx.txid}</List.Item.Subtitle>
        </Box>
      </List.Item>
    ));
  }

  unlockingChart() {
    const { cumulativeVestedAtBlocks, transferUnlockDateFormatted } = this.props.address;
    const { STXUSD } = this.state;
    const conversion = parseFloat(STXUSD);
    let values = Object.values(cumulativeVestedAtBlocks).map((v) => parseInt(v, 10) * 10e-7);
    if (!isNaN(conversion) && conversion !== 0) {
      values = values.map((v) => v * conversion);
    }
    const data = {
      labels: Object.keys(cumulativeVestedAtBlocks).map((t) => parseInt(t, 10)),
      datasets: [
        {
          borderColor: 'rgba(0,255,255,1)',
          backgroundColor: 'rgba(0,255,255,0.2)',
          fill: true,
          data: values,
        },
      ],
    };
    return (
      <Card mt={3} title="STX unlocking schedule">
        <Section py={6}>
          <Type mb={6} fontWeight="normal">
            {`This address will start unlocking for transfer on `}
            <Type fontWeight="bold">{transferUnlockDateFormatted}</Type>
            .*
          </Type>
          <Type mb={6} fontWeight="normal">
            Enter a conversion rate for USD per Stack token to view how the value of this address's allocation will
            unlock over time.
          </Type>
          <Input
            mb={6}
            onChange={(e) => this.setState({ STXUSD: e.target.value })}
            value={STXUSD}
            placeholder="USD per STX"
          />
          <LineChart
            data={data}
            options={{
              responsive: true,
              legend: {
                display: false,
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem, _data) => {
                    const tooltipValue = _data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return `${parseInt(tooltipValue, 10).toLocaleString()} STX`;
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    type: 'time',
                    gridLines: {
                      color: '#F1F6F9',
                    },
                    ticks: {
                      fontColor: '#86afce',
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: '#F1F6F9',
                    },
                    ticks: {
                      fontColor: '#86afce',
                      callback: (value) => parseInt(value, 10).toLocaleString(),
                    },
                  },
                ],
              },
            }}
          />
          <Type my={6} fontWeight="light" fontSize={1}>
            *This date is approximate. The exact time depends on the respective block confirmation on the blockchain.
          </Type>
          <Type mb={6} fontWeight="light" fontSize={1}>
            Disclaimer: The data here are based on prices for the tokens as inputted by users into this projection tool
            and may not reflect their current pricing or any market data, which may be higher or lower than what is
            shown here. There is no guarantee that the market cap shown will be in existence at any particular time, or
            that Stacks Tokens can be sold at a price that is more advantageous or disadvantageous for a particular
            buyer at any particular point in time.
          </Type>
          <Type mb={6} fontWeight="light" fontSize={1}>
            No graph, chart, or formula can in and of itself determine which securities or other investments to buy or
            sell or when to buy or sell them. Potential investors should not rely on this or any other graph when making
            such determinations.
          </Type>
        </Section>
      </Card>
    );
  }

  render() {
    const { address } = this.props;
    return (
      <Flex alignItems="flex-start" p={5} flexDirection={['column', 'column', 'row']} flexGrow={1}>
        <Box mr={[0, 0, 5]} mb={[5, 5, 0]} width={['100%', '100%', '380px']}>
          <Card width={1} title="Address Details" pb={4}>
            <Section alignItems="center" justifyContent="center" py={4} color="blue.dark">
              <QRCode level="H" fgColor="currentColor" renderAs="svg" size={156} value={address.address} />
            </Section>
            <Section pb={4}>
              <Attribute label="Address" value={address.address} />
              <Attribute label="BTC Address" value={address.btcAddress} />
              <Attribute label="Balance" value={stacksValue(address.balance)} />
              <Attribute label="Total Received" value={stacksValue(address.status.credit_value)} />
              <Attribute label="Total Sent" value={stacksValue(address.status.debit_value)} />
            </Section>
          </Card>
        </Box>
        <Box width={[1, 1, 'calc(100% - 420px)']} flexGrow={1}>
          <Card width={1} title="Transactions">
            {this.txList()}
          </Card>
          {address.cumulativeVestedAtBlocks ? this.unlockingChart() : ''}
        </Box>
      </Flex>
    );
  }
}
