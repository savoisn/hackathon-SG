import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

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
      selectedUsers: [],
    };
  }


  componentWillMount() {
    const users = this.props.sgUsers.map((user) => {
      return user.id;
    });
    this.setState({ selectedUsers: users });
    this.setState({ payer: this.props.authentication.user.userId });
  }

  componentWillReceiveProps(nextProps) {
    const myusers = nextProps.sgUsers;
    const users = myusers.map((user) => {
      return user.id;
    });
    this.setState({ selectedUsers: users });
    this.setState({ payer: this.props.authentication.user.userId });
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

  handleUserSelect = (e, user) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const selectedUsers = this.state.selectedUsers;
    let newSelectedUsers = [];
    if (value) {
      newSelectedUsers = [...selectedUsers, user.id];
    } else {
      newSelectedUsers = selectedUsers.filter(id =>
        id !== user.id,
      );
    }
    this.setState({
      selectedUsers: newSelectedUsers,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Ajouter une dépense</h1>

              <TextField
                hintText="Libellé"
                onChange={(e, value) => this.handleChange(e, 'name', value)}
                style={styles.property}
                value={this.state.name}
              />


              <TextField
                hintText="amount"
                onChange={(e, value) => this.handleChange(e, 'amount', value)}
                style={styles.property}
                type="number"
                value={this.state.amount}
              />

            <ul className={styles.list}>
              {_.map(this.props.sgUsers, (user, index) => (
                <li key={index}>
                  <input id={index} type="checkbox"
                    onChange={e => this.handleUserSelect(e, user)}
                    checked={this.state.selectedUsers.includes(user.id)}
                  />
                  <label htmlFor={index}>
                    <img src={user.pik} />
                    {user.firstName}
                  </label>
                </li>
              ))}
            </ul>

          <RaisedButton
            label="Enregistrer"
            primary={true}
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
    sgUsers: state.sgusers,
    authentication: state.authentication,
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
