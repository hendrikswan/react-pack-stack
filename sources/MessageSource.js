var Actions = require('../actions');

var MessageSource = {
  getMessages: {
    remote(state){

      var firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages/' +
        state.selectedChannel.key);

      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var messages = dataSnapshot.val();
          resolve(messages);
        })
      });
    },

    success: Actions.messagesReceived,
    error: Actions.messagesFailed
  }
}

export default MessageSource;
