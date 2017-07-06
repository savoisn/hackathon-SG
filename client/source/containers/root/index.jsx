import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { hashHistory } from 'react-router';

import HeaderBar from '../../components/header-bar';
import SideBar from '../../components/side-bar';

import * as AuthenticationEffect from '../../effects/authentication';
import * as SideBarAction from '../../actions/side-bar';

import * as SgUserActions from '../../actions/sgusers';

import styles from './index.css';

export class Root extends Component {

  componentWillMount() {
    this.props.sgUsersActions.getSgUsers();
  }

  doLogout() {
    this.props.authenticationEffects.logout();
  }

  goToLogin() {
    hashHistory.push('/login');
  }

  render() {
    if (_.isEmpty(this.props.authentication)) return (<div />);
    return (
      <div>
        <HeaderBar
          onOpenSideBar={this.props.sideBarActions.open}
        />
        <SideBar
          open={this.props.sideBar.open}
          onCloseSideBar={this.props.sideBarActions.close}
          onLogout={this.props.authenticationEffects.logout}
          goToLogin={this.goToLogin}
        />
        {this.props.children}

        <Link className={styles.addExpense} to="/addExpense"><span>+</span></Link>
      </div>
    );
  }

}

Root.propTypes = {
  authentication: PropTypes.shape({
    id: PropTypes.string,
  }),
  authenticationEffects: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  sideBar: PropTypes.shape({
    open: PropTypes.bool,
  }),
  sideBarActions: PropTypes.shape({
    open: PropTypes.func,
    close: PropTypes.func,
  }),
  children: PropTypes.element,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
    sideBar: state['side-bar'],
    sgUsers: state.sgusers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticationEffects: bindActionCreators(AuthenticationEffect, dispatch),
    sideBarActions: bindActionCreators(SideBarAction, dispatch),
    sgUsersActions: bindActionCreators(SgUserActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
