import React from 'react';
import App from './App.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import Router from 'react-router';
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


function checkUser(){
  console.log('on enter!');
}

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Chat}/>
    <Route path="chat" handler={Chat} />
    <Route path="login" handler={Login} onEnter={checkUser} />
  </Route>
);



Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('container'));
});
