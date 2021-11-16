import React from 'react';
import preloader from '../assets/images/preloader.svg';

const Preloader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={preloader} alt="Preloader" />
    </div>
  );
};

export default Preloader;
