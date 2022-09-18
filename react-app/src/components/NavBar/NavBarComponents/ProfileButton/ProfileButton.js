import React, {useState} from "react";
import ProfileDropDownInfo from "./ProfileDropDown/ProfileDropDownInfo";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import profileImage from '../../../../assets/ProfileDefault-removebg-preview.png'
import './ProfileButton.css'


function ProfileButton() {
    
    const sessionUser = useSelector(state => state.session.user)
    // console.log(sessionUser)
    const [menu, setMenu] = useState(false)

    function toggleMenu(e){
        setMenu(current => !current) 
    }

    

  return (
    <div>
        {sessionUser && ( 
            <div>
                <div onClick={(e) => toggleMenu(e)} className='' id='profile-image-wrapper'>
                    <img id='profile-image' src={sessionUser.profilePicture ? sessionUser.profilePicture : profileImage} />
                </div>
                {menu && (
                    <div>
                        <ProfileDropDownInfo sessionUser={sessionUser}/>
                    </div>
                )}
            </div>
        )
        }
        {!sessionUser && (
            <div> 
                <div>
                    <NavLink to='/login'>Log In</NavLink>
                </div>
                <div>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProfileButton;