import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Flex, Box, Card } from 'blockstack-ui';
import { Section, Cell, Primary, Secondary, Tertiary } from '@styled/list';
import { Type } from '@styled/typography';

import { fetchNameOperations } from '@client/api';

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
        <Cell>
          <Tertiary>{nameOp.timeAgo}</Tertiary>
          <Primary>{nameOp.name}</Primary>
          <Secondary>Owned by {nameOp.address}</Secondary>
        </Cell>
      </Link>
    ));
  }

  render() {
    return (
      <Flex p={5} flexDirection="row" width={1}>
        <Card p={0}>
          <Type.h2>Latest Names Registered</Type.h2>
          {this.nameOps()}
        </Card>
      </Flex>
    );
  }
}

export default Home;
