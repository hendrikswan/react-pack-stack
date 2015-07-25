import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';
import $ from 'webpack-zepto';
import AppActions from '../actions';

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
            <div style={{
              color: '#555 !important',
              fontSize: '14px !important'
            }}>
                {message.message}
            </div>
          }
          secondaryTextLines={2}>
            <div style={{
              display: 'flex',
              flexDirection:'row'
            }}>
                <div style={{
                  color: '#000',
                  fontSize: '14px',
                  fontWeight:'700'
                }}>
                {message.author}
                </div>
                <div style={{
                  'paddingLeft': '20px',
                  'color': '#999',
                  'fontWeight' : '300',
                  'fontSize': '14px'
                }}>
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
