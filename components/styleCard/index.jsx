import React from 'react';
import style from './style.module.scss';

const StyleCard = props => {
    return (
        <div className={style.card} style={{ backgroundImage: `url(${props.image})` }}>
            {/* <img src={props.image} /> */}
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
};

export default StyleCard;