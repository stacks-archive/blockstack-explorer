import React from 'react';
import { Type, Input, Box } from 'blockstack-ui';
import { Card } from '@components/card';
import { Section } from '@components/section';
import { Line as LineChart } from 'react-chartjs-2';
import { State } from 'react-powerplug';
import { Consumer } from '@pages/_app';

const options = {
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
};

const Disclaimer = ({ ...rest }) => (
  <Type mb={4} fontWeight="light" lineHeight={1.75} fontSize={1} maxWidth="80%" {...rest} />
);

const StacksUnlockingChart = ({ ...rest }) => (
  <Consumer>
    {({ address }) =>
      address ? (
        <State initial={{ STXUSD: '' }}>
          {({ state, setState }) => {
            const { cumulativeVestedAtBlocks, transferUnlockDateFormatted } = address;
            const conversion = parseFloat(state.STXUSD);

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
              <Card title="STX Unlocking Schedule" {...rest}>
                <Section py={6}>
                  <Type mb={6} fontWeight="normal">
                    {`This address will start unlocking for transfer on `}
                    <Type fontWeight="bold">{transferUnlockDateFormatted}</Type>
                    .*
                  </Type>
                  <Type mb={6} fontWeight="normal">
                    Enter a conversion rate for USD per Stack token to view how the value of this address's allocation
                    will unlock over time.
                  </Type>
                  <Input
                    type="number"
                    mb={6}
                    onChange={(e) => setState({ STXUSD: e.target.value })}
                    value={state.STXUSD}
                    placeholder="USD per STX"
                  />
                  <LineChart data={data} options={options} />
                  <Box pt={7}>
                    <Disclaimer>
                      *This date is approximate. The exact time depends on the respective block confirmation on the
                      blockchain.
                    </Disclaimer>
                    <Disclaimer>
                      <strong>Disclaimer:</strong>
{' '}
The data here are based on prices for the tokens as inputted by users
                      into this projection tool and may not reflect their current pricing or any market data, which may
                      be higher or lower than what is shown here. There is no guarantee that the market cap shown will
                      be in existence at any particular time, or that Stacks Tokens can be sold at a price that is more
                      advantageous or disadvantageous for a particular buyer at any particular point in time.
</Disclaimer>
                    <Disclaimer>
                      No graph, chart, or formula can in and of itself determine which securities or other investments
                      to buy or sell or when to buy or sell them. Potential investors should not rely on this or any
                      other graph when making such determinations.
                    </Disclaimer>
                  </Box>
                </Section>
              </Card>
            );
          }}
        </State>
      ) : null
    }
  </Consumer>
);

export { StacksUnlockingChart };
