import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Translate from 'react-translate-component';

export default class SideBar extends Component {
  handleLogout() {
    console.log('logout');
  }

  render() {
    return (
      <Drawer open={this.props.open}>
        <AppBar
          onLeftIconButtonTouchTap={this.props.onCloseSideBar}
          title="Menu"
        />
        <List>
          <ListItem
            onTouchTap={this.props.goToLogin}
            primaryText="Login"
          />
          <ListItem
            onTouchTap={this.props.goToPayment}
            primaryText="Make a payment"
          />
          <ListItem
            onTouchTap={this.props.goToLogout}
            primaryText={<Translate content="authentication.logout" />}
          />
        </List>
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  open: PropTypes.bool,
  onCloseSideBar: PropTypes.func,
  goToLogin: PropTypes.func,
  goToLogout: PropTypes.func,
  goToPayment: PropTypes.func,
};
