import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import styles from './index.css';

import * as ExpenseActions from '../../actions/expense';

class Activity extends Component {
  render() {
    return (
      <h1>Liste des dépenses</h1>
    );
  }
}

Activity.propTypes = {
};

function mapStateToProps(state) {
  return {
    sgUsers: state.sgusers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Activity);
