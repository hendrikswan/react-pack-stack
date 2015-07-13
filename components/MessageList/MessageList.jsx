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
            messages: {},
            loading: true
        };
    }

    componentDidUpdate() {
        $('html, body').scrollTop( $(document).height());
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
      var messages = MessageStore.getMessages();
      if(messages){
        this.setState({
          messages: messages,
          loading: false
        });
      }
      MessageStore.addChangeListener(this.onChange.bind(this)); //will it unbind correctly then?
    }

    render(){
        var cardStyle= {
          flexGrow: 2,
          marginLeft: 30
        };


        if(this.state.loading){
            return (
            <Card className="MessageList" style={cardStyle}>
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
        .values()
        .map(function (message) {
            return (
              <Message message={message} />
            );
        })
        .value();

        return (
            <Card className="MessageList" style={cardStyle}>
              <List>
              {{messageNodes}}
              </List>
            </Card>

        );
    }
}

MessageList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = MessageList;
