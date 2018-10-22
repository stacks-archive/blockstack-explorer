import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Flex, Type, Box, Card, theme } from 'blockstack-ui';

import sys from 'system-components';

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

import { fetchNameOperations } from '@client/api';

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

  static propTypes = {
    nameOperations: PropTypes.array.isRequired,
  };

  nameOps = () => {
    return this.props.nameOperations.map((nameOp) => (
      <Link href={`/names/${nameOp.name}`} passHref key={nameOp.txid}>
        <ListItem is={'a'} href={`/names/${nameOp.name}`}>
          <Box>
            <Type fontSize={2} fontWeight={500} pb={1} color={'blue.dark'}>
              {nameOp.name}
            </Type>
            <Type fontSize={1} color={'blue.mid'}>
              Owned by {nameOp.address}
            </Type>
          </Box>
          <Type color={'blue.mid'} fontSize={1}>
            {nameOp.timeAgo}
          </Type>
        </ListItem>
      </Link>
    ));
  };

  render() {
    return (
      <Flex p={5} flexDirection="row" alignItems={'flex-start'} width={1}>
        <Card flexGrow={1} p={0} fontWeight={500} mr={[0, 5]}>
          <CardHeader
            title="Latest Names Registered"
            actions={
              <Link href={'/names'}>
                <Type opacity={0.5} is="a" color={'blue.dark'}>
                  See All
                </Type>
              </Link>
            }
          />
          {this.nameOps()}
        </Card>
        <Box top={'113px'} position={['static', 'sticky']} flexGrow={1} maxWidth={'500px'}>
          <Card mb={5} flexGrow={1} p={0} fontWeight={400}>
            <CardHeader title="Global statistics" />
            <Flex flexWrap="wrap">
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
              <StatItem label="total names" value={'240,829'} />
            </Flex>
          </Card>
          <Card flexGrow={1} p={0} fontWeight={400}>
            <CardHeader title="Weekly name growth" />
            <Box p={5}>content</Box>
          </Card>
        </Box>
      </Flex>
    );
  }
}

export default Home;
