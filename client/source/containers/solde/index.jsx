import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import * as ExpenseActions from '../../actions/expense';

import styles from './index.css';

class Solde extends Component {

  getUserBalance = (amount, totalSpent, userNum) => {
    console.log(amount, totalSpent, userNum)
    let userBalance = amount - (totalSpent / userNum);
    console.log(userBalance)
    userBalance = userBalance.toFixed(2);
    return userBalance;
  }

  getTotalSpent = (expenses) => {
    let projectTotalSpend = 0;
    _.map(expenses, (expense) => {
      projectTotalSpend += expense.amount;
    });
    return projectTotalSpend;
  }

  getExpenseSummary = (sgUsers, expenses) => {
    let expenseSummary = {};
    let totalCost = 0;
    _.map(sgUsers, (user) => (
      expenseSummary[user.id] = {
        email: user.email,
        amount: 0,
      }
    ));
    _.map(expenses, (expense) => (
      expenseSummary[expense.PayerId].amount += expense.amount,
      totalCost += expense.amount
    ));
    const totalSpent = this.getTotalSpent(expenses);
    console.log(expenseSummary, 'ziufiueviuefbuiezudgue')
    for (let i in expenseSummary) {
      expenseSummary[i].balance = this.getUserBalance(expenseSummary[i].amount, totalSpent, sgUsers.length);
      console.log(expenseSummary[i].balance, i)
      console.log(expenseSummary)
    }
    console.log(expenseSummary)
    return expenseSummary;
  }
  handleBalanceClick = () => {
    // Calcul des soldesexpenses
    let positiveUser = [];
    let negativeUser = [];

    const expenseSummary = this.getExpenseSummary(this.props.sgUsers, this.props.expenses);
    console.log(expenseSummary)
    for (let i in expenseSummary) {
      if (expenseSummary[i].balance > 0) {
        positiveUser.push(expenseSummary[i]);
      } else if (expenseSummary[i].balance < 0) {
        expenseSummary[i].balance *= -1;
        negativeUser.push(expenseSummary[i]);
      }
    }
    for (const i in positiveUser) {
      while (positiveUser[i].balance > 0 && negativeUser[0]) {
        if (positiveUser[i].balance > negativeUser[0].balance) {
          positiveUser[i].balance -= negativeUser[0].balance;
          negativeUser.shift();
          // call API
        } else {
          negativeUser[0].balance -= positiveUser[i].balance;
          positiveUser[i].balance = 0;
          // call API
        }
      }
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>Voulez-vous solder la balance de vos comptes ?</h1>

        <div className={styles.btnLine}>
          <Link className={styles.firstLink} onClick={this.handleBalanceClick}><i></i><span>Valider</span></Link>
        </div>
      </div>
    );
  }
}

Solde.propTypes = {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Solde);
