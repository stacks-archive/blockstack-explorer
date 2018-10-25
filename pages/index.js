import React from 'react';
import Link from 'next/link';
import { Flex, Type, Box } from 'blockstack-ui';
import { Card } from '@components/card';
import { NamesList } from '@containers/lists/names';
import { fetchNameOperations, fetchNameCounts } from '@common/lib/client/api';
import { Page } from '@components/page';
import { Stat } from '@components/stats';

const StatItem = ({ value, label, width = 0.5, ...rest }) => (
  <Stat {...rest}>
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
    const [nameOperations, nameCounts] = await Promise.all([fetchNameOperations(), fetchNameCounts()]);
    return {
      nameOperations,
      nameCounts,
      meta: {
        title: 'Home',
      },
    };
  }

  render() {
    const { names, subdomains, total } = this.props.nameCounts;
    return (
      <Page>
        <Card width={1} mb={[5, 5, 0]} title="Latest Names Registered" actions={Actions} mr={[0, 0, 5]}>
          <NamesList />
        </Card>
        <Box top="113px" position={['static', 'sticky']} flexGrow={1} maxWidth={['100%', '100%', '500px']}>
          <Card title="Global statistics">
            <Flex flexWrap="wrap">
              <StatItem width={1} label="total names" value={total} />
              <StatItem label="domains" value={names} />
              <StatItem label="subdomains" value={subdomains} />
            </Flex>
          </Card>
        </Box>
      </Page>
    );
  }
}

export default Home;
