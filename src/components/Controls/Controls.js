import React from 'react';
import './Controls.scss';


class Controls extends React.Component {
    state = {

    }

    render() {
        return (
            <>
                <section className="control">
                    <button className="player__button-new" onClick={this.props.newGame}>New Game</button>
                    <div className="player__results-box">
                        <div className="player__panel">
                            <input className="player__input-bet" placeholder="Bet sum"></input>
                            <button className="player__button-bet">Bet</button>
                        </div>
                        <div className="player__wallet"> 
                            <p className="player__text">Wallet</p>
                            <p className="player__text colour">$7643</p>
                        </div>

                        <div className="player__buttons">
                        <button className="player__button-hit">Hit</button>
                        <button className="player__button-stand">Stand</button>
                        </div>
                    </div>
                </section>
                
            </>
        )
    }
}

export default Controls;