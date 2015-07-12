var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var $ = require('webpack-zepto');
var MessageStore = require('../../stores/MessageStore');
require('./Message.scss');

var {
    ListItem,
    Avatar
} = mui;



class Message extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
      var message = this.props.message;
      return (
        <ListItem
          key={message.key}
          leftAvatar={<Avatar src={message.profilePic} />}
          secondaryText={
            <div className="MessageList_message_text">
                {message.message}
            </div>
          }
          secondaryTextLines={2}>
            <div className="MessageList_message">
                <div className="MessageList_message_author">
                {message.author}
                </div>
                <div className="MessageList_message_date">
                {message.ago}
                </div>
            </div>

        </ListItem>
      );
    }
}

Message.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Message;
