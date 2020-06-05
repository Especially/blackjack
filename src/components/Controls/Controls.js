import React from 'react';
import './Controls.scss';


class Controls extends React.Component {
    state = {

    }

    render() {
        return (
            <>
                <button onClick={this.props.newGame}>New Game</button>
                <button onClick={() => {
                    return this.props.drawCards(null, 'user')}}>Hit</button>
                <button onClick={this.props.userStay}>Stay</button>
            </>
        )
    }
}

export default Controls;