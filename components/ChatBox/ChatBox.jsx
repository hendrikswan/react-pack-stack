var React = require('react');
var mui = require('material-ui');
var trim = require('trim');
var Firebase = require('Firebase');

var {
    Card,
    TextField
} = mui;

require('./ChatBox.scss');

class ChatBox extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            "message": ""
        };
    }

    componentWillMount(){
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/chats');
    }

    render(){
        return (
            <Card className="ChatBox">
                <textarea
                    value={this.state.message}
                    onKeyUp={this.onKeyUp.bind(this)}
                    onChange={this.onChange.bind(this)}
                    className="ChatBox_message" />
            </Card>

        );
    }

    onChange(event) {
        this.setState({
          message: event.target.value
        });
    }

    onKeyUp(evt){
        if(evt.keyCode === 13 && trim(event.target.value) != ''){
            evt.preventDefault();
            this.setState({
                message: ''
            });


            this.firebaseRef.push({
                "message": event.target.value,
                "date": new Date().toUTCString(),
                "author": "Hendrik Swanepoel",
                "profilePic": "http://www.gravatar.com/avatar/a424e1b0ab3a8dee82c25ae0f0804107?s=48&d=identicon"
            });
        }
    }
}

ChatBox.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = ChatBox;
