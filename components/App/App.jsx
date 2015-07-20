import React from 'react';
import mui from 'material-ui';
import connectToStores from 'alt/utils/connectToStores';
import ChatStore from '../../stores/ChatStore';
import Login from '../Login/Login.jsx'
import ChannelList from '../ChannelList/ChannelList.jsx'


var {
    AppBar
} = mui;

var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

@connectToStores
class App extends React.Component {

    static getStores(){
      return [ChatStore];
    }

    static getPropsFromStores(){
      return ChatStore.getState();
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };


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
        let view = <Login />;

        if(this.props.user){
          view = (
            <div>
              <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                maxWidth: 1200,
                width: '100%',
                margin: '0px auto 30px'
              }}>

                <ChannelList />
              </div>
            </div>
          );
        }

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
                {{view}}
            </div>
        );
    }
}

//App = connectToStores(App);


React.render(<App  />, document.getElementById('container'));
