var React = require('react');
var mui = require('material-ui');
var Firebase = require('Firebase');

var {
    RaisedButton
} = mui;


class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            success: false,
            failed: false
        };
    }

    componentWillMount(){
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com');
    }

    onClick(){
      this.firebaseRef.authWithOAuthPopup("google", (error, authData) => {
        if (error) {
          console.log("Login Failed!", error);
          this.setState({success: false, failed: true});
        } else {
          this.setState({success: true, failed: false});
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

    render(){

        return (
            <RaisedButton onClick={this.onClick.bind(this)} label="Primary" primary={true} />

        );
    }
}

Login.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Login;
