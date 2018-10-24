import React from 'react';
import Link from 'next/link';
import { Flex, Type, Box } from 'blockstack-ui';
import { Card } from '@components/card';
import sys from 'system-components';
import { NamesList } from '@containers/lists/names';
import { fetchNameOperations } from '@common/lib/client/api';
const ListItem = sys(
  {
    is: Flex,
    borderBottom: '1px solid',
    borderColor: 'blue.mid',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    px: 4,
    py: 4,
    color: 'blue.dark',
  },
  ({ theme: { colors } }) => ({
    '&:hover': {
      background: colors.blue.light,
    },
  }),
);

const CardHeader = ({ title, actions, ...rest }) => (
  <Flex justifyContent={'space-between'} px={4} py={4} borderBottom={'1px solid'} borderColor={'blue.mid'} {...rest}>
    <Type fontSize={2} fontWeight={500} color="blue.dark">
      {title}
    </Type>
    {actions ? <Box>{actions}</Box> : null}
  </Flex>
);

const StatItem = ({ value, label, ...rest }) => (
  <Flex width={0.5} p={6} flexDirection="column" alignItems="center" {...rest}>
    <Type color="blue.dark" pb={3} fontSize={6}>
      {value}
    </Type>
    <Type>{label}</Type>
  </Flex>
);

class Home extends React.Component {
  static async getInitialProps() {
    const nameOperations = await fetchNameOperations();
    return {
      nameOperations,
      meta: {
        title: 'Home',
      },
    };
  }

  render() {
    return (
      <Flex p={5} flexDirection={['column', 'column', 'row']} alignItems={'flex-start'} width={1}>
        <Card
          width={1}
          mb={[5, 5, 0]}
          title="Latest Names Registered"
          actions={
            <Link href={'/names'}>
              <Type opacity={0.5} is="a" color={'blue.dark'}>
                See All
              </Type>
            </Link>
          }
          mr={[0, 0, 5]}
        >
          <NamesList />
        </Card>
        <Box top={'113px'} position={['static', 'sticky']} flexGrow={1} maxWidth={['100%', '100%', '500px']}>
          <Card title="Global statistics">
            <Flex flexWrap="wrap">
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
            </Flex>
          </Card>
        </Box>
      </Flex>
    );
  }
}

export default Home;
