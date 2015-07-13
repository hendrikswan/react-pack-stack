var React = require('react');
var mui = require('material-ui');
var Firebase = require('Firebase');
var AppActions = require('../../actions');
require('./Login.scss');

var {
    Card,
    CardText,
    RaisedButton
} = mui;


class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            result: '',
            message: ''
        };
    }


    onClick(){
      AppActions.startAuth();
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
