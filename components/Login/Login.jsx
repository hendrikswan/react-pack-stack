import React from 'react';
import mui from 'material-ui';
import Actions from '../../actions';
import './Login.scss';
import ChatStore from '../../stores/ChatStore';
import connectToStores from 'alt/utils/connectToStores';
var {
    Card,
    CardText,
    RaisedButton
} = mui;


@connectToStores
class Login extends React.Component {
    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

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
