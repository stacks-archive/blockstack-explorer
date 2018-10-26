import React from 'react';
import { Button } from 'blockstack-ui';

export class DatePickerButton extends React.Component {
  render() {
    return (
      <Button size={this.props.size} onClick={this.props.onClick}>
        Pick Date
      </Button>
    );
  }
}
