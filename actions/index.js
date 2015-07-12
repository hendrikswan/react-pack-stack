var AppDispatcher = require('../dispatcher');
var AppConstants = require('../constants');

class Actions {
  sendMessage(message){
    AppDispatcher.dispatch({
      actionType: AppConstants.CHAT_SEND_MESSAGE,
      message: message
    });
  }
}

module.exports = new Actions();
