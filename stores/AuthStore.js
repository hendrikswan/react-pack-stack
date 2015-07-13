var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants');
var Firebase = require('Firebase');
var CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor(){
    super();
    this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com');
    this.registerWithDispatcher();
  }

  registerWithDispatcher(){
    this.dispatchToken = AppDispatcher.register((action)=>{
      switch(action.actionType){
        case AppConstants.AUTH_START:
          this.startAuth();
          break;
      }
    });
  }

  startAuth(){
    this.firebaseRef.authWithOAuthPopup("google", (error, authData) => {
      this.authInfo = {
        user: authData,
        error: error
      };

      this.emit(CHANGE_EVENT);
    });
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAuthInfo(){
    return this.authInfo;
  }
}

module.exports = new Store();