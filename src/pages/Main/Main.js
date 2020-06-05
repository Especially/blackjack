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
        notice: '',
        dealerCards: [],
        playerCards: [],
        dealerCount: 0,
        playerCount: 0,
        wallet: 500,
        gameOver: false
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

    evaluateCard(card) {
        if (!Number(card.value)) {
            console.log('Not a number', card.value);
            if (card.value === ('JACK','QUEEN','KING')) {
                const val = 10;
            }

        } else {
            console.log(card.value);
        }

    }
    gameReset() {
        this.setState({deckID: null,
            bet: 0,
            notice: '',
            dealerCards: [],
            playerCards: [],
            dealerCount: 0,
            playerCount: 0,
            gameOver: false})
    }

    drawCards(newGame, player) {
        if (newGame) {
            axios.get(`${API_URL}/${this.state.deckID}/draw/?count=4`)
                .then(res => {
                    const cards = res.data.cards;
                    const dealer = [cards[0], cards[2]];
                    const player = [cards[1], cards[3]];
                    this.setState({ dealer, player });
                    this.state.dealer.forEach( item => {
                        this.evaluateCard(item);
                    })
                }).catch(err => console.log(err));
        }
        else {
            axios.get(`${API_URL}/${this.state.deckID}/draw/?count=1`)
                .then(res => {
                    const card = res.data.cards;
                    const cards = (player === 'user') ? this.state.playerCards : this.state.dealerCards;
                    const newCards = [...cards, card];
                    console.log(newCards);
                    (player === 'user') ? this.setState({playerCards: newCards}) : this.setState({dealerCards: newCards});

                })
        }
    }


    render() {
        return (
            <>
                <Dealer deckID={this.state.deckID}></Dealer>
                <Player deckID={this.state.deckID} newGame={this.newGame.bind(this)} drawCards={this.drawCards.bind(this)}></Player>
            </>
        )
    }
}

export default Main;