import alt from '../alt';
import AuthService from '../Services/AuthService';

class Actions {
  //there are more explicit ways of defining functions - show steps
  constructor(){
    this.generateActions(
      'channelsReceived',
      'channelsFailed',
      'messagesReceived',
      'messagesFailed',
      'messageReceived',
      'openChannel',
      'messagesLoading',
      'sendMessage',
      'messageSent',
      'messageSendFailed'
    );
  }

  login(router){
    return (dispatch)=> {
      AuthService.startAuth()
        .then((result)=> {
          dispatch(result);
          // this.initChannels();
          router.transitionTo('/chat');
        });
    }
  }
}

export default alt.createActions(Actions);
