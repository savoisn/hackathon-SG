import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

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

  render() {

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
