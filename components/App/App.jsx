var React = require('react');
var mui = require('material-ui');
var {
    AppBar
} = mui;

var ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

require('./App.scss');
var MessageList = require('../MessageList/MessageList.jsx');
var ChannelList = require('../ChannelList/ChannelList.jsx');
var MessageBox = require('../MessageBox/MessageBox.jsx');
var Login = require('../Login/Login.jsx');

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          auth: false
        }
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

    loginSuccess(auth){
      this.setState({
        auth: auth
      });
    }

    render(){
        let view = <Login loginSuccess={this.loginSuccess.bind(this)} />;

        //if(this.state.auth){
          view = (
            <div>
              <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                maxWidth: 1200,
                width: '100%',
                margin: '100px auto 30px'
              }}>

                <ChannelList auth={this.state.auth} />
                <MessageList auth={this.state.auth} />
              </div>
              <MessageBox auth={this.state.auth} />
            </div>
          );
      //  }

        return (
            <div>
                <AppBar style={{
                    position: 'fixed',
                    top: 0
                  }}
                  title='Acme Chat'
                  showMenuIconButton={false}
                />
                {{view}}
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

React.render(<App  />, document.getElementById('container'));
