import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../../assets/YEat-logo_1_25.png'
import text_red from '../../../../assets/YEat-text_5_15.png'
import text_black from '../../../../assets/YEat-text-black_2_15.png'
import './component.css'



function HomeButton() {
  return (
    <div>
      <NavLink to="/" exact={true} activeClassName="active" id='home-button-nav'>
        <div id='home-button-text'>
          <img src={text_black} id='yeat-text'/>
          <img src={logo} />
        </div>
      </NavLink>
    </div>
  );
}

export default HomeButton;