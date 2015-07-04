var React = require('react');

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

    render(){
        var auctionNodes = this.state.auctions.map(function (auction) {
          return (
            <div className="AuctionList_auction_item">{auction.title} - {auction.starting}</div>
          );
        });

        return (
            <div className="AuctionList_list">
                {auctionNodes}
            </div>
        );
    }
}

React.render(<AuctionList  />, document.getElementById('container'));
