import React from 'react';
import CardComponent from '../Card/card-component';
import './hand-component.css';

const HandComponent = props => {
  const { cards, opponent, onCardClicked } = props;
  const rotationStyle = {
    transform: opponent ? `rotate(180deg)`: ''
  };
  const total = cards.length;
  const half = Math.floor(total / 2);
  const separationNum = 8;
  let currentRotation = (half * separationNum) * -1;

  const renderCardComponent = () => {
    return cards.map(({ code, hidden }, idx) => {
      const rotateStyle = {
        'zIndex': ((total + idx) - total + '')
      };
      const rotateValue = currentRotation;
      currentRotation = currentRotation + separationNum;
      
      const cardClicked = () => {
        onCardClicked(idx, opponent);
      }

      return (
        <div className="hand-container-wrapper" style={rotateStyle} key={code + currentRotation + idx}>
          <CardComponent onCardClicked={cardClicked} hidden={hidden} cardCode={code} rotate={rotateValue} key={code + idx}/>
        </div>
      )
    })
  }
  
  return (
    <div className="hand-container" style={rotationStyle}>
      { renderCardComponent() }
    </div>
  )
}

export default HandComponent;