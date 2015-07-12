var React = require('react');
var mui = require('material-ui');
var Firebase = require('Firebase');
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

    componentWillMount(){
        // var auth = localStorage.getItem('auth');
        // if(auth){
        //
        // }
      
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com');
    }

    onClick(){
      this.firebaseRef.authWithOAuthPopup("google", (error, authData) => {
        if (error) {
          return this.SetState({
            result: 'failed',
            message: 'We could not log you in'
          });
        }

        if(this.props.loginSuccess)
          return this.props.loginSuccess(authData);
      });
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
