import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Flex, Type, Box, Card } from 'blockstack-ui';
import { Section, Cell, Primary, Secondary, Tertiary } from '@styled/list';

import { fetchNameOperations } from '@client/api';

const CardHeader = ({ title, actions, ...rest }) => (
  <Flex justifyContent={'space-between'} px={5} py={5} borderBottom={'1px solid'} borderColor={'blue.mid'} {...rest}>
    <Type color="blue.dark" fontWeight="bold">
      {title}
    </Type>
    {actions ? <Box>{actions}</Box> : null}
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

  nameOps() {
    return this.props.nameOperations.map((nameOp) => (
      <Link href={`/names/${nameOp.name}`} passHref key={nameOp.txid}>
        <Flex borderBottom={'1px solid'} borderColor={'blue.mid'} position="relative" px={5} py={4}>
          <Tertiary>{nameOp.timeAgo}</Tertiary>
          <Box>
            <Type fontSize={2} pb={1} fontWeight={'600'} color={'blue.dark'}>
              {nameOp.name}
            </Type>
            <Secondary>Owned by {nameOp.address}</Secondary>
          </Box>
        </Flex>
      </Link>
    ));
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        <Card width={1} p={0}>
          <CardHeader
            title="Latest Names Registered"
            actions={
              <Link href={'/names'}>
                <Type opacity={0.5} is="a" fontWeight={'bold'} color={'blue.dark'}>
                  See All
                </Type>
              </Link>
            }
          />
          {this.nameOps()}
        </Card>
      </Flex>
    );
  }
}

export default Home;
