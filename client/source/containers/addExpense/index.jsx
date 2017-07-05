import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import FlatButton from 'material-ui/FlatButton';

import styles from './index.css';

import * as ExpenseActions from '../../actions/expense';

class Expense extends Component {

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
      selectedUser: [],
    };
  }


  componentWillMount() {
    this.props.expenseActions.getExpense();
  }

  createModelInstance = () => {
    this.props.expenseActions.createExpense(this.state);
  };

  handleChange = (e, key, value) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      [key]: value,
    });
  };

  handleUserSelect = (e, username) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const selectedUser = this.state.selectedUser;
    let newSelectedUser = [];
    if (value) {
      newSelectedUser = [...selectedUser, username];
    } else {
      newSelectedUser = selectedUser.filter(name =>
        name !== username,
      );
    }

    this.setState({
      selectedUser: newSelectedUser,
    });
  }
  render() {
    console.log(this.state.selectedUser);
    return (
      <div style={styles.container}>
        <h1>Expense</h1>

              <TextField
                hintText="name"
                onChange={(e, value) => this.handleChange(e, 'name', value)}
                style={styles.property}
                value={this.state.name}
              />


              <DatePicker
                hintText="date"
                onChange={(e, value) => this.handleChange(e, 'date', value)}
                style={styles.property}
                value={this.state.date}
              />


              <TextField
                hintText="amount"
                onChange={(e, value) => this.handleChange(e, 'amount', value)}
                style={styles.property}
                type="number"
                value={this.state.amount}
              />


              <TextField
                hintText="payer"
                onChange={(e, value) => this.handleChange(e, 'payer', value)}
                style={styles.property}
                value={this.state.payer}
              />


              <TextField
                hintText="recipients"
                onChange={(e, value) => this.handleChange(e, 'recipients', value)}
                style={styles.property}
                value={this.state.recipients}
              />

          <FlatButton
            label="Submit"
            onTouchTap={this.createModelInstance}
          />

          <ul>
            {_.map(this.props.sgUsers, (user, index) => (
              <li key={index}>
                <input type="checkbox" 
                  onChange={e => this.handleUserSelect(e, user.username)}
                />
                <img src={"./"+user.username} />
                {user.firstName}
              </li>
            ))}
          </ul>
        </div>
      


    );
  }
}

Expense.propTypes = {
  expenses: PropTypes.array.isRequired,
  expenseActions: PropTypes.shape({
    getExpense: PropTypes.func.isRequired,
    createExpense: PropTypes.func.isRequired,
  })
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
)(Expense);
