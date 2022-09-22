import React, { useState, useEffect } from "react";
import SplashProfileDropDownInfo from "./SplashProfileDropDown/SplashProfileDropDownInfo";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import profileImage from '../../../../assets/ProfileDefault-removebg-preview.png'
import './SplashProfileButton.css'


function SplashProfileButton() {
    
    const sessionUser = useSelector(state => state.session.user)
    const [menu, setMenu] = useState(false)

    function toggleMenu(e){
        setMenu(current => !current) 
    }

    useEffect(() => {
        const closeMenu = () => {
            if(menu){
                setMenu(false)
            }
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [menu])

  return (
    <div>
        {sessionUser && ( 
            <div>
                <div onClick={(e) => toggleMenu(e)} className='' id='splash-profile-image-wrapper'>
                    <img id='splash-profile-image' src={sessionUser.profilePicture ? sessionUser.profilePicture : profileImage} />
                </div>
                {menu && (
                    <div id='splash-utility-drop-down'>
                        <SplashProfileDropDownInfo sessionUser={sessionUser}/>
                    </div>
                )}
            </div>
        )
        }
        {!sessionUser && (
            <div className="flex-row"> 
                <div id='splash-login-container'>
                    <NavLink 
                        to='/login'
                        id='splash-login-button'
                    >
                        Log In
                    </NavLink>
                </div>
                <div id='splash-signup-container'>
                    <NavLink 
                        to='/signup'
                        id='splash-signup-button'
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        )}
    </div>
  )
}

export default SplashProfileButton;