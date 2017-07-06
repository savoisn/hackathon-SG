import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import styles from './index.css';

class HeaderBar extends Component {
  render() {
    let userTotalSpend = 0;
    let projectTotalSpend = 0;
    let userId = this.props.authentication.user.userId;
    _.map(this.props.expenses, (expense) => {
      projectTotalSpend += expense.amount;
      if (userId === expense.PayerId) {
        userTotalSpend += expense.amount;
      }
    });
    let userBalance = userTotalSpend - (projectTotalSpend/this.props.sgUsers.length);
    userBalance = userBalance.toFixed(2);
    return (
      <div>

      <AppBar
        onLeftIconButtonTouchTap={this.props.onOpenSideBar}
        title="Cash Pool"
      />

      <div className={styles.btnLine}>

        <Link className={styles.firstLink} to="/"><i></i><span>solder</span></Link>
        <Link className={styles.secondLink}><span> {userBalance} €</span></Link>
        <Link className={styles.thirdLink} to="/"><i></i><span>activité</span></Link>
      </div>

      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    expenses: state.expense,
    authentication: state.authentication,
    sgUsers: state.sgusers,
  };
}
HeaderBar.propTypes = {
  onOpenSideBar: PropTypes.func,
};
export default connect(
  mapStateToProps,
)(HeaderBar);
