var React = require('react');
var mui = require('material-ui');
var {
    AppBar
} = mui;

var ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

require('./App.scss');
var MessageList = require('../MessageList/MessageList.jsx');
var MessageBox = require('../MessageBox/MessageBox.jsx');
var Login = require('../Login/Login.jsx');

class App extends React.Component {
    constructor(props){
        super(props);
    }


    getChildContext() {
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillMount() {
        ThemeManager.setPalette({
          primary1Color: Colors.blue500,
          primary2Color: Colors.blue700,
          primary3Color: Colors.blue100,
          accent1Color: Colors.pink400
        });
    }

    render(){
        return (
            <div className="AuctionApp">
                <AppBar title='Acme Chat' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <MessageList />
                <MessageBox />
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

React.render(<App  />, document.getElementById('container'));
