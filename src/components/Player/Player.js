import React from 'react';
import axios from 'axios';
import Controls from '../../components/Controls/Controls';
import './Player.scss';


class Player extends React.Component {
    state = {
        wallet: 500
    }

    render() {
        return (
            <>
                <Controls newGame={this.props.newGame}></Controls>
            </>
        )
    }
}

export default Player;