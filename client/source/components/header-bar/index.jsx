import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

export default class HeaderBar extends Component {
  render() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={this.props.onOpenSideBar}
        title="Cash Pool"
      />
    );
  }
}

HeaderBar.propTypes = {
  onOpenSideBar: PropTypes.func,
};
