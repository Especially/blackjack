import React from 'react';
import './Controls.scss';


class Controls extends React.Component {
    state = {

    }

    render() {
        return (
            <>
                <button onClick={this.props.newGame}>New Game</button>
            </>
        )
    }
}

export default Controls;