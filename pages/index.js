import React from 'react';
import Link from 'next/link';
import { Flex, Type, Box } from 'blockstack-ui';
import { Card } from '@components/card';
import { NamesList } from '@containers/lists/names';
import { fetchHomeInfo } from '@common/lib/client/api';
import { Page } from '@components/page';
import { Stat } from '@components/stats';
import { Section } from '@components/section';

import { Line as LineChart } from 'react-chartjs-2';

const StatItem = ({ value, label, width = 0.5, ...rest }) => (
  <Stat {...rest} width={width}>
    <Stat.Value>{value}</Stat.Value>
    <Stat.Label>{label}</Stat.Label>
  </Stat>
);

const Actions = () => (
  <Link passHref prefetch href="/names">
    <Type opacity={0.5} is="a" color="blue.dark">
      See All
    </Type>
  </Link>
);

class Home extends React.Component {
  static async getInitialProps() {
    // const [nameOperations, nameTotals] = await Promise.all([fetchNameOperations(), fetchNameCounts()]);
    const homeInfo = await fetchHomeInfo();
    return {
      ...homeInfo,
      meta: {
        title: 'Home',
      },
    };
  }

  render() {
    const { namesFormatted, subdomainsFormatted } = this.props.nameTotals;
    const { nameOperationsOverTime, totalStacks } = this.props;
    const data = {
      labels: nameOperationsOverTime.map((op) => op.x),
      datasets: [
        {
          borderColor: 'rgba(0,255,255,1)',
          backgroundColor: 'rgba(0,255,255,0.2)',
          fill: true,
          data: nameOperationsOverTime,
        },
      ],
    };

    return (
      <Page>
        <Card width={1} mb={[5, 5, 0]} title="Latest Names Registered" actions={Actions} mr={[0, 0, 5]}>
          <NamesList limit={10} />
        </Card>
        <Box top="113px" position={['static', 'sticky']} width={[1, 1, 1, '700px']}>
          <Card title="Global statistics">
            <Flex flexWrap="wrap">
              <StatItem width={1} label="total stacks" value={totalStacks} />
              <StatItem width={0.5} label="names" value={namesFormatted} />
              <StatItem width={0.5} label="subdomains" value={subdomainsFormatted} />
            </Flex>
          </Card>

          <Card mt={3} title="Recent Name Growth">
            <Section py={2}>
              <LineChart
                data={data}
                options={{
                  responsive: true,
                  legend: {
                    display: false,
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
                        },
                      },
                    ],
                  },
                }}
              />
              {/* <ResponsiveContainer height={400} width="100%">
                <LineChart
                  data={this.props.nameOperationsOverTime}
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                >
                  <XAxis
                    dataKey="time"
                    type="number"
                    tickFormatter={(tick) => tick}
                    domain={['dataMin', 'dataMax']}
                    label={{ value: 'Date', position: 'insideBottom', offset: -25 }}
                  />
                  <Line dataKey="names" />
                  <YAxis
                    tickFormatter={(usd) => numeral(usd).format('0a')}
                    domain={[minCount, maxCount]}
                    dataKey="names"
                    tick={false}
                    label={{ value: 'Total Names', angle: -90, position: 'insideLeft', offset: -10 }}
                  />
                  <CartesianGrid />
                </LineChart>
              </ResponsiveContainer> */}
            </Section>
          </Card>
        </Box>
      </Page>
    );
  }
}

export default Home;
