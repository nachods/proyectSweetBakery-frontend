import React from 'react';
import "./Background.css";

const Background = ({ children }) => {
  return (
    <div className="area">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="content" style={{ zIndex: 2, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};


export default Background;
