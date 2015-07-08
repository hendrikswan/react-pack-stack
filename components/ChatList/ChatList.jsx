var React = require('react');
var mui = require('material-ui');
var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    IconButton,
    ToggleStarBorder,
} = mui;
var Colors = mui.Styles.Colors;


require('./ChatList.scss');
var Firebase = require('firebase');

class ChatList extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            "chats": []
        };
    }


    componentWillMount(){
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/chats');
        this.firebaseRef.on("value", function(dataSnapshot) {
            this.setState({
                chats: dataSnapshot.val()
            });
        }.bind(this));
    }

    render(){
        var chatNodes = this.state.chats.map(function (chat) {
            return (
                <ListItem
                  className=""
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
        });

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
