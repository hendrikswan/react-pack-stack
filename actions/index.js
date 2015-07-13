var AppDispatcher = require('../dispatcher');
var AppConstants = require('../constants');

class Actions {
  sendMessage(message){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHAT_SEND_MESSAGE,
      message: message
    });
  }

  readMessage(message){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHAT_READ_MESSAGE,
      message: message
    });
  }

  startAuth(){
    AppDispatcher.dispatch({
      actionType: AppConstants.AUTH_START
    });
  }
}

module.exports = new Actions();
