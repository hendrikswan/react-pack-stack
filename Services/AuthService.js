var Firebase = require('Firebase');


class AuthService {
  
  constructor(){
    this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com');

    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  getUser(){
    return this.user;
  }

  startAuth(){
    return new Promise((resolve, reject) => {
      if(this.user){
        return resolve(this.user);
      }

      this.firebaseRef.authWithOAuthPopup("google", (error, user) => {
        if(error){
          return reject(error);
        }
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));

        return resolve(user);
      });
    });
  }
}

module.exports = new AuthService();
