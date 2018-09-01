import React from 'react';
import './button-component.css';

const ButtonComponent = props => {
  return (
    <button className="button-component" onClick={() => props.onClick()}>{props.text}</button>
  )
}

export default ButtonComponent;