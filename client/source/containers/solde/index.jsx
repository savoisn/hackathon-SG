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
  getUserBalance = (userId, expenses, sgUsers) => {
    let userTotalSpend = 0;
    let projectTotalSpend = 0;
    _.map(expenses, (expense) => {
      projectTotalSpend += expense.amount;
      if (userId === expense.PayerId) {
        userTotalSpend += expense.amount;
      }
    });
    let userBalance = userTotalSpend - (projectTotalSpend / sgUsers.length);
    userBalance = userBalance.toFixed(2);
    return userBalance;
  }

  getTotalSpent = (userId, expenses) => {
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
        name: user.firstName + ' ' + user.lastName,
        pic: user.pik,
        amount: 0,
      }
    ));
    _.map(expenses, (expense) => (
      expenseSummary[expense.PayerId].amount += expense.amount,
      totalCost += expense.amount
    ));
    return expenseSummary;
  }

  handleBalanceClick = () => {
    console.log('handle balance');
    // Calcul des soldes
    const userBalance = this.getUserBalance(
      this.props.authentication.user.userId,
      this.props.expenses,
      this.props.sgUsers,
    );

    const expenseSummary = this.getExpenseSummary(this.props.sgUsers, this.props.expenses);
    console.log('expenseSummary : ', expenseSummary);

    const projectTotalSpent = this.getTotalSpent(
      this.props.authentication.user.userId,
      this.props.expenses,
    );
    console.log('projectTotalSpent : ', projectTotalSpent);

    const balanceSummary = _.map(expenseSummary, (expense) => {
      const balanceObject = {};
      const shouldHavePaid = parseFloat(projectTotalSpent) / Object.keys(expenseSummary).length;
      const balance = expense.amount - shouldHavePaid;
      const twoDecimalBalance = parseFloat(Math.round(balance * 100) / 100).toFixed(2);
      balanceObject.balance = twoDecimalBalance;
      balanceObject.name = expense.name;
      switch (expense.name) {
        case 'Nicolas Savois':
          balanceObject.email = 'nsavois@gmail.com';
          break;
        case 'Aurelie Ambal':
          balanceObject.email = 'aambal@gmail.com';
          break;
        case 'Benjamin Dekens':
          balanceObject.email = 'bdekens@gmail.com';
          break;
        case 'Thang Nguyen':
          balanceObject.email = 'tnguyen@gmail.com';
          break;
        default:
          break;
      }
      return balanceObject;
    });
    console.log('balanceSummary : ', balanceSummary);

    // Call API
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
