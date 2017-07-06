import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/login';

import {login} from '../../effects/authentication';

class LoginContainer extends Component {
  render() {
    const { authentication = {} } = this.props;
    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6">
            <Login loginEffect= {this.props.loginEffect}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginEffect: bindActionCreators(login, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
