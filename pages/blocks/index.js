import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import { Flex, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchBlocks } from '@common/lib/client/api';
import { Time } from '@components/time';
import { BlocksList } from '@containers/lists/blocks';
import ChevronDoubleLeftIcon from 'mdi-react/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'mdi-react/ChevronDoubleRightIcon';
// import DatePicker from 'react-datepicker';
// import { DatePickerButton } from '@components/buttons';

const keys = [
  {
    label: 'Height',
    key: 'height',
  },
  {
    label: 'Timestamp',
    key: 'time',
    value: (data) => (data.time ? <Time date={data.time} /> : ''),
  },
  {
    label: 'Name Operations',
    value: (data) => (data.nameOps && data.nameOps.length) || '0',
    key: 'nameOperations',
    display: ['none', 'block'],
  },
  {
    label: 'Transactions',
    key: 'txCount',
    display: ['none', 'block'],
  },
  {
    label: 'Mined By',
    key: 'poolInfo',
    value: (data) => (data.poolInfo && data.poolInfo.poolName ? data.poolInfo.poolName : ''),
    display: ['none', 'block'],
  },
  {
    label: 'Size',
    key: 'size',
  },
];

const DateButton = ({ icon: Icon, direction = 'back', children, ...rest }) => {
  const iconProps =
    direction === 'back'
      ? {
          size: 11,
          style: { top: '1px', position: 'relative', left: '-3px', order: 0 },
        }
      : {
          size: 11,
          style: { top: '1px', position: 'relative', right: '-3px', order: 3 },
        };

  return (
    <Button size="small" {...rest}>
      <Icon {...iconProps} />
      {children}
    </Button>
  );
};

const DateActions = ({ date, navigateDate, ...rest }) => {
  const yesterday = moment(date)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  let tomorrow;

  if (moment(date).format('YYYY-MM-DD') !== this.props.today) {
    tomorrow = moment(date)
      .add(1, 'day')
      .format('YYYY-MM-DD');
  }

  return (
    <Flex
      flexGrow={1}
      pt={[3, 0, 0]}
      width={[1, 'auto', 'auto']}
      alignItems="center"
      justifyContent={['flex-start', 'flex-end', 'flex-end']}
    >
      <DateButton icon={ChevronDoubleLeftIcon} onClick={() => navigateDate(yesterday)}>
        {yesterday}
      </DateButton>
      {/* <DatePicker
          customInput={<DatePickerButton size="small" />}
          onChange={(selectedDate) => {
            console.log(selectedDate);
            return selectedDate;
          }}
        /> */}
      {tomorrow && (
        <DateButton direction="forward" icon={ChevronDoubleRightIcon} onClick={() => navigateDate(tomorrow)}>
          {tomorrow}
        </DateButton>
      )}
    </Flex>
  );
};

class BlocksPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const date = req && req.params ? req.params.date : query.date;
    const blocks = await fetchBlocks(date);
    const today = moment().format('YYYY-MM-DD');
    return {
      blocks,
      date,
      today,
      meta: {
        title: 'Blocks',
      },
    };
  }

  state = {
    showAll: false,
  };

  navigateDate = (date) => {
    Router.push({
      pathname: '/blocks',
      query: {
        date,
      },
    });
  };

  render() {
    const { showAll } = this.state;
    return (
      <Flex p={5} flexDirection="column" width={1}>
        <Card
          title={`Blocks for ${moment(this.props.date).format('dddd, MMMM Do YYYY')}`}
          actions={<DateActions date={this.props.date} navigateDate={this.navigateDate} />}
        >
          <BlocksList blocks={this.props.blocks} keys={keys} showAll={showAll} />
        </Card>
        {!showAll && (
          <Flex py={4} justifyContent="center">
            <Button onClick={() => this.setState({ showAll: true })}>View More Blocks</Button>
          </Flex>
        )}
      </Flex>
    );
  }
}

export default BlocksPage;
