var React = require('react');
var mui = require('material-ui');
var {
    FloatingActionButton,
    RaisedButton,
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardActions,
    FlatButton,
    CardText,
    Avatar,
    AppBar
} = mui;

require('./AuctionList.scss');
var Firebase = require('firebase');

class AuctionList extends React.Component {
    constructor(props){
        super(props);

        // this.auctions = [];
        this.state= {
            "auctions": []
        };
    }


    componentWillMount(){
        this.auctions = [];
        this.firebaseRef = new Firebase('https://fiery-torch-9637.firebaseio.com/auctions');
        this.firebaseRef.on("value", function(dataSnapshot) {
            this.auctions = dataSnapshot.val();
            this.setState({
                auctions: this.auctions
            });
        }.bind(this));
    }

    render(){
        var auctionNodes = this.state.auctions.map(function (auction) {
            var metaOverlay = (
                <div className="AuctionList_meta">

                    <div className="AuctionList_meta_row">
                        <div className="AuctionList_meta_title">
                            {auction.title}
                        </div>
                        <div className="AuctionList_meta_amount">
                            ${auction.amount}
                        </div>
                    </div>
                    <div className="AuctionList_meta_expiration_date">
                        {auction.expirationDate}
                    </div>
                </div>
            );

            return (
                <Card className="AuctionList_item">
                    <CardMedia overlay={metaOverlay}>
                        <img src="http://lorempixel.com/380/200/nature?i={auction.title}"/>
                    </CardMedia>
                    <CardText>
                        {auction.description}
                    </CardText>
                </Card>
            );
        });

        return (
            <div className="AuctionList">
                {auctionNodes}
                <FloatingActionButton style={{
                    position: 'absolute',
                    right: '30px',
                    top: '30px',
                    zIndex:100
                }}
                iconClassName="icon icon-plus"
                className="AuctionList_btn_new"
                />
            </div>
        );
    }
}

AuctionList.childContextTypes = {
    muiTheme: React.PropTypes.object
};

//React.render(<AuctionList  />, document.getElementById('container'));
module.exports = AuctionList;
