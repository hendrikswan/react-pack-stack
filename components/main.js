require('./main.css');
var msg = require('./config.js');
document.write(msg);


class Greeter {
    sayHello(){
        document.write('hello from the greeter!');
    }
}

var g = new Greeter();
g.sayHello();