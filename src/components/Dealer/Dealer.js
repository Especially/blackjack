import React from 'react';
import './Dealer.scss';
import Card from '../Card';
import ava from '../../assets/images/dealer-old.jpg'


class Dealer extends React.Component {
    state = {

    }
    cards = this.props.cards.map( item => {
        return (
            <Card link={item.image}></Card>
        )
    })
    
    render() {
        return (
            <>
                <section className="dealer__section">
                    <div className="dealer__place">
                        <img className="dealer__ava" src={ava} alt="ava"/>
                        <p className="dealer__name">Uncle Jon <br/>(Dealer)</p>
                    </div>
                    <div className="dealer__card-place">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <div className="dealer__score">
                        <div className="dealer__header">Total: </div>
                        <div className="dealer__points">$3423</div>
                    </div>
                    
                </section>
            </>
        )
    }
}

export default Dealer;