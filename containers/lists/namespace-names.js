import React from 'react';
import NProgress from 'nprogress';
import { Flex, Button } from 'blockstack-ui';
import { NamesList } from '@containers/lists/names';
import { Card } from '@components/card';

import { fetchNamespaceNames, fetchNames } from '@common/lib/client/api';

class NamespaceNames extends React.Component {
  constructor(props) {
    super(props);
    const { name } = props;
    this.state = this.originalState(name);
  }

  componentDidMount() {
    this.loadMoreNames();
  }

  componentWillReceiveProps(nextProps) {
    const { name } = this.state;
    if (nextProps.name !== name) {
      this.setState(this.originalState(nextProps.name), () => {
        this.loadMoreNames();
      });
    }
  }

  originalState = (name) => ({
    name,
    names: [],
    hasMoreNames: [],
    pageNum: -1,
  });

  async loadMoreNames() {
    NProgress.start();
    const { name } = this.props;
    let { names, pageNum } = this.state;
    pageNum += 1;
    let nameOperations;
    if (name === 'all') {
      nameOperations = await fetchNames(pageNum);
    } else {
      nameOperations = await fetchNamespaceNames(name, pageNum);
    }
    nameOperations = nameOperations.map((op) => ({
      name: op,
    }));
    names = names.concat(nameOperations);
    this.setState(
      {
        pageNum,
        hasMoreNames: nameOperations.length > 0,
        names,
      },
      () => {
        NProgress.done();
      },
    );
  }

  render() {
    const { names, hasMoreNames } = this.state;
    return (
      <Card width={1} mb={[5, 5, 0]} title="Names">
        <NamesList list={names} />
        {hasMoreNames && (
          <Flex py={4} justifyContent="center">
            <Button onClick={() => this.loadMoreNames()}>View More</Button>
          </Flex>
        )}
      </Card>
    );
  }
}

export { NamespaceNames };
