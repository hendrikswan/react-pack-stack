import React from 'react';
import mui from 'material-ui';
import Actions from '../../actions';
import './Login.scss';

var {
    Card,
    CardText,
    RaisedButton
} = mui;


class Login extends React.Component {

    onClick(){
      Actions.login();
    }

    render(){

        return (
            <Card className="Login_card">
              <CardText className="Login_copy">
                To start chatting away, please log in with your Google account.
              </CardText>
              <RaisedButton style={{
                display: 'block',
              }} onClick={this.onClick.bind(this)} label="Log in with Google" primary={true} />
            </Card>

        );
    }
}

Login.childContextTypes = {
    muiTheme: React.PropTypes.object
};


module.exports = Login;
