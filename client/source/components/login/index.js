import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameValue: '',
      paswordValue: '',
    };
  }

  //getInitialState() {
    //console.log(this);
    //return {
      //usernameValue: '',
      //paswordValue: '',
    //};
  //}

  handleUsernameFieldChange = (e) => {
    console.log("cii");
    this.setState({
      usernameValue: e.target.value,
    });
  }

  handlePasswordFieldChange(e) {
    this.setState({
      passwordValue: e.target.value,
    });
  }

  handleLogin = () => {
    const username = this.state.usernameValue;
    const password = this.state.passwordValue;

    console.log(username, password);
    const credentials = {
      username,
      password
    }
    console.log(this.props);
    this.props.loginEffect(credentials);
  }

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div className="box">
        <Card>
          <CardText>
            <h1>Cash Pool</h1>
            <TextField
              hintText='Username'
              value={this.state.usernameValue}
              onChange={e => this.handleUsernameFieldChange(e)}
            />
            <br />
            <TextField
              hintText='Password'
              value={this.state.passwordValue}
              onChange={e => this.handlePasswordFieldChange(e)}
            />
            <br />
            <RaisedButton
              onTouchTap={() => this.handleLogin()}
              label='Login'
              primary={true}
              style={style}
            />
          </CardText>
        </Card>
      </div>);
  }
}

export default Login;

