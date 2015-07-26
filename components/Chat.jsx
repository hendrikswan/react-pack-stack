import React from 'react';
import mui from 'material-ui';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';
import MessageBox from './MessageBox.jsx';
import ChatStore from '../stores/ChatStore';

class Chat extends React.Component {

  componentDidMount(){
        console.log('chat mounted - ', this.props.params.channel);
  }

  render(){
      return (
          <div>
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              maxWidth: 1200,
              width: '100%',
              margin: '0px auto 30px'
            }}>

              <ChannelList {...this.props} />
              <MessageList  />
            </div>

            <MessageBox />
          </div>
      );
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static willTransitionTo(transition){
    var state = ChatStore.getState();
    if(!state.user){
      transition.redirect('/login');
    }
  }
}


export default Chat;
