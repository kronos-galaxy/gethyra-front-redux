import React, { Component } from 'react';
import './logo.scss';
import logo from 'assets/images/logo.png';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logo} alt="Logo gethyra" />
      </div>
    );
  }
}

export default Logo;
