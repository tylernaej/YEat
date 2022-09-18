import React from "react";
import { NavLink } from "react-router-dom";


function HomeButton() {
  return (
    <div>
      <NavLink to="/" exact={true} activeClassName="active">
        Home
      </NavLink>
    </div>
  );
}

export default HomeButton;