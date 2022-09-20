import React from "react";
import { NavLink } from "react-router-dom";


function CreateBusinessButton() {
  return (
    <div>
        <NavLink to={'/create-business/details'}>Create A Business</NavLink>
    </div>
  )
}

export default CreateBusinessButton;
