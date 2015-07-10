var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var moment = require('moment');
var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress
} = mui;


require('./MessageList.scss');
var Firebase = require('firebase');

class MessageList extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            "messages": [],
            loading: true
        };
    }

    // componentWillUpdate() {
    //     debugger;
    //   var node = React.findDOMNode (this);
    //   this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    // }

    // componentDidUpdate() {
    //   if (this.shouldScrollBottom) {
    //     var node = React.findDOMNode (this);
    //     node.scrollTop = node.scrollHeight
    //   }
    // }


    componentWillMount(){
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages');
        this.firebaseRef.once("value", (dataSnapshot) => {
            let val = dataSnapshot.val();

            _(val)
              .values()
              .each((msg)=> {
                msg.ago = moment(new Date(msg.date)).fromNow();
              })
              .value();

            this.setState({
                messages: val,
                loading: false
            });
        }.bind(this));

        this.firebaseRef.on("child_added", (msg) => {
            let msgVal = msg.val()
            msgVal.ago = moment(new Date(msgVal.date)).fromNow();
            this.state.messages[msg.key()] = msgVal;

            this.setState({
                messages: this.state.messages
            });
        }.bind(this));
    }

    render(){
        if(this.state.loading){
            return (
            <Card className="MessageList">
                <div style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    margin: '0 auto',
                    display: 'block',
                    width: '160px'
                }}>
                    <CircularProgress mode="indeterminate" />
                </div>
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
                <List subheader="Today">
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
