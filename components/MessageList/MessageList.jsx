var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var $ = require('webpack-zepto');
var MessageStore = require('../../stores/MessageStore');
require('./MessageList.scss');
var Message = require('../Message/Message.jsx');

var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress,
    CardText
} = mui;



class MessageList extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            messages: [],
            loading: true
        };
    }

    componentWillUpdate() {
      var node = React.findDOMNode (this);
      this.shouldScrollBottom = this.firstLoad ||
        $(window).scrollTop() + $(window).height() === $(document).height();
      if(this.firstLoad){
        this.firstLoad = false;
      }
    }

    componentDidUpdate() {
      if (this.shouldScrollBottom) {
        $('html, body').scrollTop( $(document).height());
      }
    }

    componentWillUnmount() {
      MessageStore.removeChangeListener(this.onChange);
    }

    onChange(){
      this.firstLoad = this.state.loading;

      this.setState({
        messages: MessageStore.getMessages(),
        unreadCount: MessageStore.getUnreadCount(),
        loading: false
      });
    }


    componentWillMount(){
        MessageStore.addChangeListener(this.onChange.bind(this));
    }

    render(){
        if(this.state.loading){
            return (
            <Card className="MessageList">
              <CircularProgress mode="indeterminate" style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                margin: '0 auto',
                display: 'block',
                width: '60px'
              }} />
            </Card>
            );
        }

        var messages = this.state.messages;
        var messageNodes = _(messages)
        .keys()
        .map(function (k) {
            var message = messages[k];
            message.key = k;
            return (
              <Message message={message} />
            );
        })
        .value();

        return (
            <Card className="MessageList">
              <CardText>You have {this.state.unreadCount} unread messages.</CardText>
              <List>
              {{messageNodes}}
              </List>
              <CardText>You have {this.state.unreadCount} unread messages.</CardText>
            </Card>

        );
    }
}

MessageList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = MessageList;
