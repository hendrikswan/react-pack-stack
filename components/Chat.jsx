import React from 'react';
import mui from 'material-ui';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';
import MessageBox from './MessageBox.jsx';


class Chat extends React.Component {

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

                <ChannelList />
                <MessageList />
              </div>

              <MessageBox />
            </div>
        );
    }
}

//todo: do this with static props
ChannelList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Chat;
