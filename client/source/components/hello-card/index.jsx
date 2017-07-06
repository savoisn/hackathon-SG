import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import * as ExpenseActions from '../../actions/expense';
import { bindActionCreators } from 'redux';

import styles from './index.css';

class HelloCard extends Component {
  componentWillMount() {
    this.props.expenseActions.getExpense();
  }
  render() {
    let expenseSummary = {};
    let totalCost = 0;
    _.map(this.props.sgUsers, (user) => (
      expenseSummary[user.id] = {
        name: user.firstName + ' ' + user.lastName,
        pic: user.pik,
        amount: 0,
      }
    ));
    _.map(this.props.expenses, (expense) => (
      expenseSummary[expense.PayerId].amount += expense.amount,
      totalCost += expense.amount
    ));

    const expenses = this.props.expenses;
    let lastSpentUserFirstName;
    if (expenses && expenses[expenses.length - 1] && expenses[expenses.length - 1].PayerId) {
      const lastSpentPayerId = expenses[expenses.length - 1].PayerId;
      lastSpentUserFirstName = this.props.sgUsers.filter(user => user.id === lastSpentPayerId)[0].firstName;
    }

    const { authentication: { user = { roles: [] } } } = this.props;
    return (
      <div className={styles.container}>
        <Card>
          <CardText>
            <h1>Dépenses : {totalCost} €</h1>
          </CardText>
        </Card>
        <ul className={styles.list}>
          {_.map(expenseSummary, (expense, index) => (
            <li key={index} > <img src={expense.pic} />{expense.name} <span>{expense.amount} €</span></li>
          ))}
        </ul>

        <div className={styles.newExpense}>
          <p>{lastSpentUserFirstName} vient d'ajouter une dépense</p>
        </div>

      </div>);
  }

}

HelloCard.propTypes = {
  authentication: PropTypes.shape({
    user: PropTypes.shape({
      firstName: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      }),
      ),
    }),
  }),
  expenseActions: PropTypes.shape({
    getExpense: PropTypes.func.isRequired
  }),
};

function mapStateToProps(state) {
  return {
    expenses: state.expense,
    sgUsers: state.sgusers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    expenseActions: bindActionCreators(ExpenseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelloCard);
