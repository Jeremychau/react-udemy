import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (porps) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={porps.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
