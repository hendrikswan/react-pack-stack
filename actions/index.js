import alt from '../alt';
import AuthService from '../Services/AuthService';
import ChannelService from '../Services/ChannelService';

class Actions {
  //there are more explicit ways of defining functions - show steps
  constructor(){
    this.generateActions(
      'channelsReceived',
      'channelsFailed',
      'messagesReceived',
      'messagesFailed'
    );
  }

  login(){
    return (dispatch)=> {
      AuthService.startAuth()
        .then((result)=> {
          dispatch(result);
          this.initChannels();
        });
    }
  }

  // initChannels(){
  //   return (dispatch)=> {
  //     ChannelService.initChannels()
  //       .then((result)=> {
  //         dispatch(result);
  //       });
  //   }
  // }
}

export default alt.createActions(Actions);


// class Actions {
//   sendMessage(message){
//     AppDispatcher.dispatch({
//       actionType: AppConstants.CHAT_SEND_MESSAGE,
//       message: message
//     });
//   }
//
//   readMessage(message){
//     AppDispatcher.dispatch({
//       actionType: AppConstants.CHAT_READ_MESSAGE,
//       message: message
//     });
//   }
//
//   startAuth(){
//     AppDispatcher.dispatch({
//       actionType: AppConstants.AUTH_START
//     });
//   }
//
//   openChannel(channel){
//     AppDispatcher.dispatch({
//       actionType: AppConstants.CHANNEL_OPEN,
//       channel: channel
//     });
//   }
// }

// module.exports = new Actions();
