import React from 'react';
import mui from 'material-ui';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;
require('../style/app.scss');

var {
    AppBar
} = mui;

var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

class App extends React.Component {
    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };


    getChildContext() {
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    //this should be in the constructor
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
            <div style={{
              paddingTop: 100
            }}>
                <AppBar style={{
                    position: 'fixed',
                    top: 0
                  }}
                  title='Acme Chat'
                  showMenuIconButton={false}
                />
                <RouteHandler />
            </div>
        );
    }
}

//App = connectToStores(App);


//React.render(<App  />, document.getElementById('container'));
export default App;
