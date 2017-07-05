import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import * as ExpenseActions from '../../actions/expense';
import { bindActionCreators } from 'redux';

class HelloCard extends Component {
  componentWillMount() {
    this.props.expenseActions.getExpense();
  }
  render() {
    let expenseSummary = {};
    _.map(this.props.sgUsers, (user) => (
      expenseSummary[user.id] = {
        name: user.firstName + ' ' + user.lastName,
        amount: 0,
      }
    ));
    _.map(this.props.expenses, (expense) => (
      expenseSummary[expense.PayerId].amount += expense.amount
    ));

    const { authentication: { user = { roles: [] } } } = this.props;
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Hello {user.firstName}</h1>
            <h2>Your roles: {user.roles.map(role => role.name).join(', ')}</h2>
          </CardText>
        </Card>
        <ul>
          {_.map(expenseSummary, (expense, index) => (
            <li key={index} >{expense.name} {expense.amount}</li>
          ))}
        </ul>
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
