import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import * as ExpenseActions from '../../actions/expense';

import styles from './index.css';

class Solde extends Component {
  handleBalanceClick = () => {
    console.log('handle balance');
    // Calcul des soldes

    // Call API
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>Voulez-vous solder la balance de vos comptes ?</h1>
        <RaisedButton
          label="Valider"
          primary={true}
          onTouchTap={this.handleBalanceClick} />
      </div>
    );
  }
}

Solde.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Solde);
