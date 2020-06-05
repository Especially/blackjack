import React from 'react';
import axios from 'axios';
import Controls from '../../components/Controls/Controls';
import './Player.scss';


class Player extends React.Component() {
    state = {

    }

    render() {
        return (
            <>
                <Controls></Controls>
            </>
        )
    }
}

export default Player;