var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');

var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress
} = mui;


require('./ChatList.scss');
var Firebase = require('firebase');

class ChatList extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            "chats": [],
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
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/chats');
        this.firebaseRef.once("value", (dataSnapshot) => {
            var val = dataSnapshot.val();


            this.setState({
                chats: val,
                loading: false
            });
        }.bind(this));

        this.firebaseRef.on("child_added", (chatMsg) => {
            this.state.chats[chatMsg.key()] = chatMsg.val();

            this.setState({
                chats: this.state.chats
            });
        }.bind(this));
    }

    render(){
        if(this.state.loading){
            return (
            <Card className="ChatList">
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

        var chats = this.state.chats;
        var chatNodes = _(chats)
        .keys()
        .map(function (k) {
            var chat = chats[k];

            return (
                <ListItem
                  key={k}
                  leftAvatar={<Avatar src={chat.profilePic} />}
                  secondaryText={
                    <div className="ChatList_message_text">
                        {chat.message}
                    </div>
                  }
                  secondaryTextLines={2}>
                    <div className="ChatList_message">
                        <div className="ChatList_message_author">
                        {chat.author}
                        </div>
                        <div className="ChatList_message_date">
                        {chat.date}
                        </div>
                    </div>

                </ListItem>
            );
        })
        .value();

        return (
            <Card className="ChatList">
                <List subheader="Today">
                {{chatNodes}}
                </List>
            </Card>

        );
    }
}

ChatList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = ChatList;
