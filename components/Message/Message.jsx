var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var $ = require('webpack-zepto');
var AppActions = require('../../actions');
require('./Message.scss');

var {
    ListItem,
    Avatar
} = mui;



class Message extends React.Component {
    constructor(props){
        super(props);
    }

    isInViewport (el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=  $(window).height() &&
            rect.right <= $(window).width()
        );
    }

    componentDidMount() {
      if(!this.props.message.isRead){
        var node = React.findDOMNode (this);

        var readHandler = () => {
          if(this.isInViewport(node)){
            AppActions.readMessage(this.props.message);
            console.log('message ' + this.props.message.message + ' read!');
            $(window).off('scroll', readHandler);
          }
        }

        $(window).on('scroll', readHandler);
        // var node = React.findDOMNode (this);
        // $(node).scroll(()=> {
        //   console.log('scrolled!');
        // });
      }
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
