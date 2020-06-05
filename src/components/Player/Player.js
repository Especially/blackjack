import React from 'react';
import axios from 'axios';
import Controls from '../../components/Controls/Controls';
import './Player.scss';
import avaPlayer from '../../assets/images/dealer-young.jpg'
import Card from '../Card';


class Player extends React.Component {
    state = {
        wallet: 500
    }

    render() {
        return (
            <>
                <section className="player__section">
                    <div className="player__place">
                        <img className="player__ava" src={avaPlayer} alt="ava"/>
                        <p className="player__name"> Garry <br/>(You)</p>
                    </div>
                    <div className="player__card-place">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <div className="dealer__score">
                        <div className="player__header">Total: </div>
                        <div className="player__points">$976</div>
                    </div>
                </section>
                <Controls newGame={this.props.newGame}></Controls>
            </>
        )
    }
}

export default Player;