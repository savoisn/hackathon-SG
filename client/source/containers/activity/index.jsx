import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';

import styles from './index.css';

import * as ExpenseActions from '../../actions/expense';

class Activity extends Component {
  componentWillMount() {
    this.props.expenseActions.getExpense();
  }
  render() {
    console.log('users : ', this.props.sgUsers);
    console.log('expenses : ', this.props.expenses);
    return (
      <div>
        <ul className={styles.list}>
          {_.map(this.props.expenses, (expense, index) => (
            <li key={index}>
              <label htmlFor={index}>
                <img src={this.props.sgUsers.filter(user => user.id === expense.PayerId)[0].pik} /> {this.props.sgUsers.filter(user => user.id === expense.PayerId)[0].firstName} {this.props.sgUsers.filter(user => user.id === expense.PayerId)[0].lastName} {expense.name} {parseFloat(Math.round(parseFloat(expense.amount) * 100) / 100).toFixed(2)}€ {moment(expense.date).format('L')}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Activity.propTypes = {
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
)(Activity);
