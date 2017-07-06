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
      name: '',
      date: moment().format('YYYY-MM-DD'),
      amount: 0,
      payer: '',
      recipients: '',
      settled: false,
      errorText: {
        name: '',
        date: '',
        amount: '',
      },
      selectedUsers: [],
    };
    //setState name =libelle du de la depense
    //setState payer = la personne qui paye
  }

  componentWillMount() {
    const users = this.props.sgUsers.map((user) => {
      return user.id;
    });
    this.setState({ selectedUsers: users });
    this.setState({ payer: this.props.authentication.user.userId });
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
        userId: user.id,
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
          this.props.makeMoneyTransfer(fromUser, toUser, amount, transactionLabel).then((res) => {
            console.log('then money transfer : ', res);

            this.props.expenseActions.createExpense(
              [positiveUser[i].userId],
              `Depense ${this.state.date}`,
              this.state.date,
              amount,
              '1',
            );
          });
          negativeUser.shift();
        } else {
          negativeUser[0].balance -= positiveUser[i].balance;

          const fromUser = negativeUser[0].email;
          const toUser = positiveUser[i].email;
          const amount = positiveUser[i].balance;
          const transactionLabel = 'sold';
          this.props.makeMoneyTransfer(fromUser, toUser, amount, transactionLabel);
          //this.props.expenseActions.createExpense(this.state);
          positiveUser[i].balance = 0;
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
    expenseActions: bindActionCreators(ExpenseActions, dispatch),
    makeMoneyTransfer: bindActionCreators(makeMoneyTransfer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Solde);
