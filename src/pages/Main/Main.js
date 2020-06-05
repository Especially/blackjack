import React from 'react';
import axios from 'axios';
import Player from '../../components/Player/Player';
import Dealer from '../../components/Dealer/Dealer';
import './Main.scss';

const API_URL = `https://deckofcardsapi.com/api/deck`;

class Main extends React.Component {
    state = {
        deckID: null,
        bet: 0,
        dealer: [],
        player: []
    }

    newGame() {
        axios.get(`${API_URL}/new/shuffle/?deck_count=1`)
            .then((res) => {
                const deckID = res.data.deck_id;
                this.setState({ deckID: deckID });
                this.drawCards('new');
            }).catch(err => {
                console.log(err);
            })
    }

    drawCards(newGame) {
        if (newGame) {
            axios.get(`${API_URL}/${this.state.deckID}/draw/?count=4`)
                .then(res => {
                    const cards = res.data.cards;
                    const dealer = [cards[0], cards[2]];
                    const player = [cards[1], cards[3]];
                    this.setState({dealer, player})
                    console.log(this.state);
                })
        }
    }


    render() {
        return (
            <>
                <Dealer deckID={this.state.deckID}></Dealer>
                <Player deckID={this.state.deckID} newGame={this.newGame.bind(this)}></Player>
            </>
        )
    }
}

export default Main;