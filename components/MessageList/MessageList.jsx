var React = require('react');
var mui = require('material-ui');
var _ = require('lodash');
var $ = require('webpack-zepto');
require('./MessageList.scss');
var Message = require('../Message/Message.jsx');
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../../stores/ChatStore';

var {
    Card,
    List,
    ListItem,
    ListDivider,
    Avatar,
    CircularProgress,
    CardText
} = mui;


@connectToStores
class MessageList extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        $('html, body').scrollTop( $(document).height());
    }

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    render(){
        var cardStyle= {
          flexGrow: 2,
          marginLeft: 30
        };


        if(!this.props.messages){
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

        var messages = this.props.messages;
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
