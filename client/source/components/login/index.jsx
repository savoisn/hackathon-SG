import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import translate from 'counterpart';
import { browserHistory } from 'react-router';

class Login extends Component {
  handleLogin = () => {
    browserHistory.push('/in');
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>{translate('authentication.login')}</h1>
            <TextField
              hintText={translate('authentication.email')}
            />
            <br />
            <TextField
              hintText={translate('authentication.password')}
            />
            <br />
            <RaisedButton
              onTouchTap={() => this.handleLogin()}
              label={translate('authentication.submit')}
              primary={true}
              style={style}
            />
          </CardText>
        </Card>
      </div>);
  }
}

export default Login;
