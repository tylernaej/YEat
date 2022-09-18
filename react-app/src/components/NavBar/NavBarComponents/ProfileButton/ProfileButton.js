import React, {useState} from "react";
import ProfileDropDownInfo from "./ProfileDropDown/ProfileDropDownInfo";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


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
                <div onClick={(e) => toggleMenu(e)}>
                    <img src={sessionUser.profilePicture} alt=''/>
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