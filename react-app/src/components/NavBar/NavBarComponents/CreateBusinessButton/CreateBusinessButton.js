import React from "react";
import { NavLink } from "react-router-dom";
import './component.css'


function CreateBusinessButton() {
  return (
    <div >
        <NavLink to={'/create-business/details'} id='create-business'>Create A Business</NavLink>
    </div>
  )
}

export default CreateBusinessButton;
