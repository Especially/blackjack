import React from 'react';
import axios from 'axios';
import Player from '../../components/Player/Player';
import Dealer from '../../components/Dealer/Dealer';
import './Main.scss';
import Card from '../../components/Card/Card';
import Desk from '../../components/Desk/Desk'

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
        playerStatus: true,
        dealerStatus: false,
        wallet: 500,
        gameOver: false,
        message: ''
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

    contains(target, pattern) {
        var value = 0;
        pattern.forEach(function (word) {
            value = value + target.includes(word);
        });
        return (value === 1)
    }
    gameReset() {
        this.setState = {
            deckID: null,
            bet: 0,
            notice: '',
            dealerCards: [],
            playerCards: [],
            dealerCount: 0,
            playerCount: 0,
            playerStatus: true,
            dealerStatus: false,
            wallet: 500,
            gameOver: false,
            message: ''
        }
    }
    evaluateHand(hand, player) {
        let total = 0;
        const tens = ['JACK', 'QUEEN', 'KING'];
        if (player === 'user') {
            console.log('User hand: ', hand);
            let aceFlag = false;
            hand.forEach(item => {

                if (!Number(item.value)) {
                    if (this.contains(item.value, tens)) {
                        total += 10;
                    } else
                        if (item.value === 'ACE') {
                            console.log('has Ace');
                            aceFlag = true;
                            total += 11;
                        }
                } else {
                    total += Number(item.value);
                }
            })

            if (total > 21) {
                if (aceFlag) {
                    console.log('Theres an ace -- adjusting');
                    total -= 10;
                }
            }
            this.setState({ playerCount: total }, () => {
                console.log('User Count:', this.state.playerCount)
            })
            // Reached 21, prevent player from proceeding
            if (total === 21) {
                console.log('Auto Stay');
                this.userStay();
            }
        } else {
            console.log('Dealer hand: ', hand);
            let aceFlag = false;
            hand.forEach(item => {

                if (!Number(item.value)) {
                    if (this.contains(item.value, tens)) {
                        total += 10;
                    } else
                        if (item.value === 'ACE') {
                            console.log('has Ace');
                            aceFlag = true;
                            total += 11;
                        }
                } else {
                    total += Number(item.value);
                }
            })

            if (total > 21) {
                if (aceFlag) {
                    console.log('Theres an ace -- adjusting');
                    total -= 10;
                }
            }
            this.setState({ dealerCount: total }, () => {
                console.log('Dealer Count', this.state.dealerCount);
            });
            // If dealer gets 21
            if (total === 21) {
                this.setState({ gameOver: true, message: '21! House wins because we love to scam!!!' })
            }

            // If dealer has less than the player
            if (this.state.dealerStatus && (total < this.state.playerCount)) {
                console.log('REason 1');
                this.drawCards(null, 'dealer')
            } else
            if (this.state.dealerStatus && (total === this.state.playerCount) && (this.state.playerCount !== 21)) {
                console.log('REason 2');
                this.drawCards(null, 'dealer')
            } else
            if (this.state.dealerStatus && total < 21) {
                console.log('REason 3');
                this.drawCards(null, 'dealer');
            }
        }
        if (total > 21) {
            return this.setState({ gameOver: true, message: `Oops, ${player} busted with ${total}` })
        }

    }
    userStay() {
        console.log('User stays at: ', this.state.playerCount);
        this.setState({ playerStatus: false, dealerStatus: true});
        this.drawCards(null, 'dealer');
    }
    drawCards(newGame, player) {
        if (newGame) {
            axios.get(`${API_URL}/${this.state.deckID}/draw/?count=4`)
                .then(res => {
                    const cards = res.data.cards;
                    const dealer = [cards[0], cards[2]];
                    const player = [cards[1], cards[3]];
                    this.setState({ playerCards: player, dealerCards: dealer });
                    this.evaluateHand(this.state.playerCards, 'user');
                    this.evaluateHand(this.state.dealerCards, 'dealer');
                }).catch(err => console.log(err));
        }
        // Not a new game, just getting a new card for the player/dealer
        else {
            axios.get(`${API_URL}/${this.state.deckID}/draw/?count=1`)
                .then(res => {
                    const card = res.data.cards;
                    const cards = (player === 'user') ? this.state.playerCards : this.state.dealerCards;
                    const newCards = [...cards, ...card];
                    if (player === 'user') {
                        this.setState({ playerCards: newCards });
                        this.evaluateHand(this.state.playerCards, 'user');
                    } else {
                        this.setState({ dealerCards: newCards });
                        this.evaluateHand(this.state.dealerCards, 'dealer');
                    }
                })
        }
    }


    render() {
        return (
            <>
                <div className="main__desk">
                    <Dealer deckID={this.state.deckID}></Dealer>
                    <Desk />
                    <Player deckID={this.state.deckID} newGame={this.newGame.bind(this)} drawCards={this.drawCards.bind(this)} userStay={this.userStay.bind(this)}></Player>
                </div>
                
            </>
        )
    }
}

export default Main;