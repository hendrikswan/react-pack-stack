var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var FloatingActionButton = mui.FloatingActionButton;
var ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;
require('./AuctionList.scss');

class AuctionList extends React.Component {
    constructor(props){
        super(props);

        this.state={
            auctions: [
                {
                    "title": "Vespa",
                    "starting": 1000,
                    "description" : "A black vespa"
                },
                {
                    "title": "Nexus 6",
                    "starting": 300,
                    "description" : "A midnight blue Nexus"
                }
            ]
        };
    }


    getChildContext() {
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    getChildContext() {
        return {
          muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillMount() {
        ThemeManager.setPalette({
          accent1Color: Colors.deepOrange500
        });
    }

    render(){
        var auctionNodes = this.state.auctions.map(function (auction) {
          return (
            <div className="AuctionList_auction_item">{auction.title} - {auction.starting}</div>
          );
        });

        return (
            <div className="AuctionList_list">
                {auctionNodes}

                <RaisedButton label="Default" />

                <FloatingActionButton iconClassName="icon icon-plus" />
            </div>
        );
    }
}

AuctionList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

React.render(<AuctionList  />, document.getElementById('container'));
