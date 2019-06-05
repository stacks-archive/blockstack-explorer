import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Flex, Button } from 'blockstack-ui';
import { Card } from '@components/card';
import { fetchBlocksV2 } from '@common/lib/client/api';
import { Time } from '@components/time';
import { BlocksList } from '@containers/lists/blocks';
import ChevronDoubleLeftIcon from 'mdi-react/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'mdi-react/ChevronDoubleRightIcon';
import NProgress from 'nprogress';
import Head from '@components/head';
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
    value: (data) => (data.nameOperations && data.nameOperations.length) || '0',
    key: 'nameOperations',
    display: ['none', 'block'],
  },
  {
    label: 'Transactions',
    key: 'txCount',
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
      <Flex>
        <Icon {...iconProps} />
        <Flex>{children}</Flex>
      </Flex>
    </Button>
  );
};

const DateActions = ({ date, today, loading, fetchBlocksForDate, ...rest }) => {
  const yesterday = moment(date)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  let tomorrow;

  if (moment(date).format('YYYY-MM-DD') !== today) {
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
      <DateButton
        onClick={(e) => {
          e.preventDefault();
          fetchBlocksForDate(yesterday, 'yesterday');
        }}
        id="block-date-yesterday"
        icon={ChevronDoubleLeftIcon}
      >
        {loading === 'yesterday' ? 'Loading' : yesterday}
      </DateButton>

      {/* <DatePicker
          customInput={<DatePickerButton size="small" />}
          onChange={(selectedDate) => {
            console.log(selectedDate);
            return selectedDate;
          }}
        /> */}
      {tomorrow && (
        <DateButton
          onClick={(e) => {
            e.preventDefault();
            fetchBlocksForDate(tomorrow, 'tomorrow');
          }}
          is="a"
          id="block-date-tomorrow"
          direction="forward"
          icon={ChevronDoubleRightIcon}
        >
          {loading === 'tomorrow' ? 'Loading' : tomorrow}
        </DateButton>
      )}
    </Flex>
  );
};

class BlocksPage extends React.Component {
  static async getInitialProps({ req, query }) {
    const date = req && req.query ? req.query.date : query.date;
    console.log('date', date);
    console.log(query);
    const { blocks } = await fetchBlocksV2(date);
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
    loading: false,
    date: this.props.date ? this.props.date : this.props.today,
    pages: {
      [this.props.date ? this.props.date : this.props.today]: 0,
    },
    data: {
      [this.props.date ? this.props.date : this.props.today || 'today']: this.props.blocks,
    },
  };

  fetchBlocksForDate = async (date, direction) => {
    if (!this.state.data[date]) {
      setTimeout(() => {
        NProgress.start();
      }, 0);
      const { blocks } = await fetchBlocksV2(date);
      this.setState((state) => ({
        ...state,
        pages: {
          ...state.pages,
          [date]: state.pages[date] || 0,
        },
        data: {
          ...state.data,
          [date]: blocks,
        },
        date,
      }));
      NProgress.done();
    } else {
      setTimeout(
        () =>
          this.setState((state) => ({
            ...state,
            date,
          })),
        8,
      );
    }
  };

  async fetchNextPage() {
    const { date, pages, data } = this.state;
    NProgress.start();
    const page = pages[date];
    const { blocks } = await fetchBlocksV2(date, page + 1);
    const existingData = data[date];
    this.setState((state) => ({
      ...state,
      pages: {
        ...state.pages,
        [date]: page + 1,
      },
      data: {
        ...state.data,
        [date]: existingData.concat(blocks),
      },
    }));
    NProgress.done();
  }

  render() {
    const dateActions = (
      <DateActions
        today={this.props.today}
        date={this.state.date}
        loading={this.state.loading}
        fetchBlocksForDate={this.fetchBlocksForDate}
      />
    );
    return (
      <Flex p={5} flexDirection="column" width={1}>
        <Head title={`Blocks for ${moment(this.state.date).format('dddd, MMMM Do YYYY')}`} />
        <Card title={`Blocks for ${moment(this.state.date).format('dddd, MMMM Do YYYY')}`} actions={dateActions}>
          <BlocksList
            blocks={(this.state.date && this.state.data[this.state.date]) || this.props.blocks}
            keys={keys}
            showAll
          />
        </Card>
        <Flex py={4} justifyContent="center">
          <Button onClick={() => this.fetchNextPage()} width={0.9} id="view-more-blocks">
            View More Blocks
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default BlocksPage;
