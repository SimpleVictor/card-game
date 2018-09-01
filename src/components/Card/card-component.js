import React from 'react';
import {
  SUIT_CONSTANT,
  CARD_VALUE_CONSTANT
} from './card-component-constant';
import './card-component.css';

const CardComponent = props => {
  const { rotate, hidden, onCardClicked } = props;
  const { cardValue, suit } = formatProperties(props);

  const rotateStyle = {
    transform: rotate ? `rotateZ(${rotate}deg)` : 'rotateZ(0deg)',
    transition: 'transform 0.3s -webkit-transform 0.3s',
    transformOrigin: 'bottom'
  }

  const renderSymbol = () => {
    if (cardValue === 'ace') {
      return (<div className="symbol"></div>)
    } else if (cardValue === 'king' || cardValue === 'queen' || cardValue === 'jack') {
      return Array(2).fill('').map((val, idx) => (<div className="symbol" key={cardValue + idx}></div>));
    }
    /* TODO: Find a cleaner approach to get number value */
    const numberCard = props.cardCode[0] === '0' ? '10' : props.cardCode[0];
    return Array(Number(numberCard)).fill('').map((val, index) => (<div className="symbol" key={props.cardCode + index}></div>));
  }

  const renderCard = () => {
    const className = `${cardValue} of ${suit} card`;
    return (
      <div className={className} tabIndex="0">
        <div className="interior">
          {renderSymbol()}
        </div>
      </div>
    );
  };

  const renderHiddenCard = () => (<div className="card back" tabIndex="0"></div>);

  const uniqueKey = new Date().getTime();
  return (
    <div onClick={ () => onCardClicked() } style={rotateStyle} className="card-container" key={uniqueKey + props.cardCode} >
      {hidden ? renderHiddenCard() : renderCard()}
    </div>
  )
}

export default CardComponent;

function formatProperties(props) {
  const { cardCode } = props;
  return {
    cardValue: CARD_VALUE_CONSTANT[cardCode[0]],
    suit: SUIT_CONSTANT[cardCode[1]]
  };
}