import React from 'react';
import weWorkLogo from '../wework.jpg';
import "./logo-component.css";

const LogoComponent = props => {
  return (
    <div className="logo-container">
      <img className="logo-image" alt="wework" src={weWorkLogo} />
    </div>
  )
}

export default LogoComponent;