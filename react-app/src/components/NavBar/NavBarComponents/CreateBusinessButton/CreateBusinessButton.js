import React from "react";
import { NavLink } from "react-router-dom";


function CreateBusinessButton() {
  return (
    <div>
        <NavLink to={'/create-business'}>Create A Business</NavLink>
    </div>
  )
}

export default CreateBusinessButton;
