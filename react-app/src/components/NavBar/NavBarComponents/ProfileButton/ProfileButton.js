import React, { useState, useEffect } from "react";
import ProfileDropDownInfo from "./ProfileDropDown/ProfileDropDownInfo";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import profileImage from '../../../../assets/ProfileDefault-removebg-preview.png'
import './ProfileButton.css'


function ProfileButton() {
    
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
                <div onClick={(e) => toggleMenu(e)} className='' id='profile-image-wrapper'>
                    <img id='profile-image' src={sessionUser.profilePicture ? sessionUser.profilePicture : profileImage} />
                </div>
                {menu && (
                    <div id='utility-drop-down'>
                        <ProfileDropDownInfo sessionUser={sessionUser}/>
                    </div>
                )}
            </div>
        )
        }
        {!sessionUser && (
            <div className="flex-row"> 
                <div id='login-container'>
                    <NavLink 
                        to='/login'
                        id='login-button'
                    >
                        Log In
                    </NavLink>
                </div>
                <div id='signup-container'>
                    <NavLink 
                        to='/signup'
                        id='signup-button'
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProfileButton;