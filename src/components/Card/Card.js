import React from 'react';
import './Card.scss';
import card from '../../assets/images/card.jpg'


const Card = () => {
    return (
        <>
            <img className="card" src={card} alt="card"/>
        </>
    )
}

export default Card;