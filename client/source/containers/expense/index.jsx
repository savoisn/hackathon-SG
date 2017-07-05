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

      settled: true,

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
    if (value === undefined || value === '') {
      const errorText = this.state.errorText;
      errorText[key] = key + ' is required';
      this.setState({ errorText })
    } else {
      const errorText = this.state.errorText;
      errorText[key] = '';
      this.setState({ errorText })
    }
    this.setState({
      [key]: value,
    });
  };

  render() {
    const styles = {
      container: {
        padding: '10px',
      },

      creationContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'flex-start',
      },

      property: {
        margin: '0px 15px 0px 0px',
      },


      toggle: {
        margin: '0px 15px 0px 0px',
        width: 'auto',
      }


    };
    return (
      <div style={styles.container}>
        <h1>Expense</h1>

        <div style={styles.creationContainer}>

              <TextField

                errorText={this.state.errorText['name']}

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

                errorText="This field is required"

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


              <Toggle
                label="settled"
                onToggle={(e, value) => this.handleChange(e, 'settled', value)}
                style={styles.toggle}
                value={this.state.settled}
              />


          <FlatButton
            label="Submit"
            onTouchTap={this.createModelInstance}
          />
        </div>

        <Table> selectable={false} >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>id</TableHeaderColumn>

              <TableHeaderColumn>name</TableHeaderColumn>

              <TableHeaderColumn>date</TableHeaderColumn>

              <TableHeaderColumn>amount</TableHeaderColumn>

              <TableHeaderColumn>payer</TableHeaderColumn>

              <TableHeaderColumn>recipients</TableHeaderColumn>

              <TableHeaderColumn>settled</TableHeaderColumn>

            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} >
            {_.map(this.props.expenses, (data, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  { data.id }
                </TableRowColumn>

                <TableRowColumn>
                  { data.name }
                </TableRowColumn>

                <TableRowColumn>
                  { data.date }
                </TableRowColumn>

                <TableRowColumn>
                  { data.amount }
                </TableRowColumn>

                <TableRowColumn>
                  { data.payer }
                </TableRowColumn>

                <TableRowColumn>
                  { data.recipients }
                </TableRowColumn>

                <TableRowColumn>
                  { data.settled }
                </TableRowColumn>

              </TableRow>
            ))}
          </TableBody>
        </Table>
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
