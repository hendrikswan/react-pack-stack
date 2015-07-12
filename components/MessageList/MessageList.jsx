var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var $ = require('webpack-zepto');
var MessageStore = require('../../stores/MessageStore');
require('./MessageList.scss');

var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress
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
        loading: false
      });
    }


    componentWillMount(){
        MessageStore.addChangeListener(this.onChange.bind(this));
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages');
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

            return (
                <ListItem
                  key={k}
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
        })
        .value();

        return (
            <Card className="MessageList">
                <List>
                {{messageNodes}}
                </List>
            </Card>

        );
    }
}

MessageList.childContextTypes = {
    muiTheme: React.PropTypes.object,
    auth: React.PropTypes.object
};

module.exports = MessageList;
