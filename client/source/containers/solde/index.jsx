import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeMoneyTransfer } from '../../actions/transferMoney';

import FlatButton from 'material-ui/FlatButton';

import * as ExpenseActions from '../../actions/expense';

import styles from './index.css';

class Solde extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProjectOpened: true,
    };
  }
  getUserBalance = (amount, totalSpent, userNum) => {
    let userBalance = amount - (totalSpent / userNum);
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
    }
    return expenseSummary;
  }
  handleBalanceClick = () => {
    // Calcul des soldesexpenses
    let positiveUser = [];
    let negativeUser = [];

    const expenseSummary = this.getExpenseSummary(this.props.sgUsers, this.props.expenses);
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

          // call API
          const fromUser = negativeUser[0].email;
          const toUser = positiveUser[i].email;
          const amount = negativeUser[0].balance;
          const transactionLabel = 'sold';
          this.props.makeMoneyTransfer(fromUser, toUser, amount, transactionLabel).then((response) => {
            console.log('Money transfer : ', response);
            this.setState({
              isProjectOpened: false,
            });
          });
          negativeUser.shift();
        } else {
          negativeUser[0].balance -= positiveUser[i].balance;

          const fromUser = negativeUser[0].email;
          const toUser = positiveUser[i].email;
          const amount = positiveUser[i].balance;
          const transactionLabel = 'sold';
          this.props.makeMoneyTransfer(fromUser, toUser, amount, transactionLabel).then((response) => {
            console.log('Money transfer : ', response);
            this.setState({
              isProjectOpened: false,
            });
          });
          positiveUser[i].balance = 0;
        }
      }
    }
  }

  renderProjectOpenedHtml = () => {
    return (
      <div className={styles.container}>
        <h1>Voulez-vous solder la balance de vos comptes ?</h1>
        <div className={styles.btnLine}>
          <Link className={styles.firstLink} onClick={this.handleBalanceClick}><i></i><span>Valider</span></Link>
        </div>
      </div>
    );
  }

  renderProjectClosedHtml = () => {
    return (
      <div className={styles.container}>
        <h1>Comptes soldés</h1>
      </div>
    );
  }

  render() {
    const isProjectOpened = this.state.isProjectOpened;
    return (
      <div>
        {isProjectOpened ? this.renderProjectOpenedHtml() : this.renderProjectClosedHtml() }
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
    makeMoneyTransfer: bindActionCreators(makeMoneyTransfer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Solde);
