import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeMoneyTransfer, closeProjectBoolean } from '../../actions/transferMoney';

import * as ExpenseActions from '../../actions/expense';

import styles from './index.css';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaymentDone: false,
    };
  }

  fakePayment() {
    console.log("fakePayment");
    this.setState({isPaymentDone:true});
  }

  renderReadyToPay(){
    return (
      <div onClick={() => this.fakePayment()} className={styles.container}>
        <h1>Votre smartphone est prêt pour faire des payments par NFC</h1>
      </div>
    )
  }

  renderPaymentDone(){
    return (
      <div onClick={() => this.fakePayment()} className={styles.container}>
        <h1>Payement effectué avec succès!</h1>
        <Link to='/' className={styles.firstLink} ><i></i><span>Retour Accueil</span></Link>
      </div>
    )
  }

  render() {
    const isPaymentDone = this.state.isPaymentDone;
    return (
      <div>
      { !isPaymentDone ? this.renderReadyToPay() : this.renderPaymentDone() }
      </div>
    );
  }
}

Payment.propTypes = {
};

function mapStateToProps(state) {
  return {
    expenses: state.expense,
    authentication: state.authentication,
    sgUsers: state.sgusers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeMoneyTransfer: bindActionCreators(makeMoneyTransfer, dispatch),
    closeProjectBoolean: bindActionCreators(closeProjectBoolean, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
