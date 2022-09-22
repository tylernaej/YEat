import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../../../auth/LogoutButton";
import  './SplashProfileDropDownInfo.css'

function SplashProfileDropDownInfo({sessionUser}) {
  return (
    <div id='splash-dropdown-container'>
        <div className="flex-row-align-center" id='splash-welcome'>
            Welcome, {sessionUser.firstName}
        </div>
        <div id='splash-utilities-dropdown'>
            <div id='splash-u-d-grid'>
                <i className="fa-regular fa-envelope" id='splash-top-icon'></i>
                <div id='splash-top-text'>{sessionUser.email}</div>
            </div>
            <div id='splash-middle-text'>
                <NavLink to='/myBusinesses' id='splash-business-navlink'>
                    <i className="fa-regular fa-building" id='splash-middle-icon'></i>  
                    Your Businesses
                </NavLink>
            </div>
            <div className="flex-row" id='splash-logout-wrapper'>
                <LogoutButton id='splash-bottom-text'/>
            </div>
        </div>
    </div>
  )
}

export default SplashProfileDropDownInfo;