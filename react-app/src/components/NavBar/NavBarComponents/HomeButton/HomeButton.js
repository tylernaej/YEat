import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../../assets/favicon-32x32.png'
import './HomeButton.css'



function HomeButton() {
  return (
    <div>
      <NavLink to="/" exact={true} activeClassName="active" id='home-button-nav'>
        <div id='home-button-text'>
          YEat
        </div>
        <img src={logo} />
      </NavLink>
    </div>
  );
}

export default HomeButton;