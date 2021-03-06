import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccountBalance, makeMoneyTransfer } from '../../actions/transferMoney';

import HelloCard from '../../components/hello-card';

class HomeView extends Component {
  componentWillMount() {
    const fromUser = 'tnguyen@gmail.com';  // Should be one of : nsavois@gmail.com, aambal@gmail.com', bdekens@gmail.com, tnguyen@gmail.com, seller@fakeshop.com
    const toUser = 'seller@fakeshop.com';    // Should be one of : nsavois@gmail.com, aambal@gmail.com', bdekens@gmail.com, tnguyen@gmail.com, seller@fakeshop.com
    const amount = '5.21';
    const transactionLabel = 'ABC';
    // this.props.makeMoneyTransfer(fromUser, toUser, amount, transactionLabel); // UNCOMMENT to make transfer
  }

  render() {
    const { authentication = {} } = this.props;

    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6">
            <HelloCard authentication={authentication} />
          </div>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = HelloCard.propTypes;

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAccountBalance: bindActionCreators(getAccountBalance, dispatch),
    makeMoneyTransfer: bindActionCreators(makeMoneyTransfer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
