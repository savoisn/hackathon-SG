import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
      isWaitingPayment: false,
      isPaymentConfirmed: false,
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

  startWaiting() {
    this.setState({isWaitingPayment:true});
  }
  cancel(){
    this.setState({isWaitingPayment:false});
  }

  renderDefinePayment() {
    return (
      <div>
      <TextField
        hintText="Libellé du payement"
        onChange={(e, value) => this.handleChange(e, 'name', value)}
        style={styles.property}
        value={this.state.name}
      />

      <TextField
        hintText="montant"
        onChange={(e, value) => this.handleChange(e, 'amount', value)}
        style={styles.property}
        type="number"
        value={this.state.amount}
      />
      <br/>
      <br/>

      <RaisedButton
        label="Attendre Payment"
        primary={true}
        onTouchTap={() => this.startWaiting()}
      />
      </div>
    )
  }

  renderPaymentConfirmed() {
    return(
      <div>
        <h1 onClick={() => this.createModelInstance()}>Payement Confirmer par votre banque !</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1 onClick={() => this.createModelInstance()}>
          vous avez recu : {this.state.amount} sur votre compte.
        </h1>
        <Link to='/' className={styles.firstLink} ><i></i><span>Retour Accueil</span></Link>
      </div>
    )
  }

  renderPayment() {
    const isPaymentConfirmed = this.state.isPaymentConfirmed;

    return (
      <div className={styles.container}>
        {isPaymentConfirmed ? this.renderPaymentConfirmed() : this.renderWaiting()}
      </div>
    );
  }

  renderWaiting() {
    return (
      <div>
        <h1 onClick={() => this.setState({isPaymentConfirmed:true})}>en attente de paiement NFC...</h1>
        <h1 onClick={() => this.setState({isPaymentConfirmed:true})}>
          {this.state.amount} - {this.state.name}
        </h1>
        <img src="https://media.giphy.com/media/xUA7aQhUBeInTWZwVq/giphy.gif"/>
        <br/>
        <h1 onClick={() => this.createModelInstance()}>Votre telephone est la borne de paiement. Approcher un moyen de paiement NFC</h1>
        <RaisedButton
          label="Annuler"
          primary={true}
          onTouchTap={() => this.cancel()}
        />
      </div>
    )
  }

  render() {
    const isWaitingPayment = this.state.isWaitingPayment;
    return (
      <div className={styles.container}>
        <h1>Recevoir un paiement</h1>
        {isWaitingPayment ? this.renderPayment() : this.renderDefinePayment()}
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