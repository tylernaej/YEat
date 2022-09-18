import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../../../auth/LogoutButton";

function ProfileDropDownInfo({sessionUser}) {
  return (
    <div>
        <div>
            {sessionUser.firstName}
        </div>
        <div>
            {sessionUser.email}
        </div>
        <div>
            <NavLink to='/myBusinesses'>Your Businesses</NavLink>
        </div>
        <div>
            <LogoutButton />
        </div>
    </div>
  )
}

export default ProfileDropDownInfo;