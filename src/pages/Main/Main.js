import React from 'react';
import axios from 'axios';
import Player from '../../components/Player/Player';
import Dealer from '../../components/Dealer/Dealer';
import './Main.scss';


class Main extends React.Component() {
    state = {

    }

    render() {
        return (
            <>
                <Dealer></Dealer>
                <Player></Player>
            </>
        )
    }
}

export default Main;