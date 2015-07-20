var Actions = require('../actions');

let firebaseRef  = null;

let MessageSource = {
  getMessages: {
    remote(state){

      if(firebaseRef){
        firebaseRef.off();
      }

      firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/messages/' +
        state.selectedChannel.key);

      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var messages = dataSnapshot.val();
          resolve(messages);


          setTimeout(()=> {
            firebaseRef.on("child_added", ((msg) => {
              //do i need to keep track of the channel in case a channel
              //switch happens and we receive a message for the old channel?

              //test by opening a channel and then going to different one, and see whether this
              //fires for messages on old channel

              let msgVal = msg.val();
              msgVal.key = msg.key();
              Actions.messageReceived(msgVal);
            }));
          }, 10);

        })
      });
    },

    success: Actions.messagesReceived,
    error: Actions.messagesFailed,
    loading: Actions.messagesLoading
  }
}

export default MessageSource;
