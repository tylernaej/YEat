import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch, useParams } from "react-router-dom";
import './BusinessNavBar.css'

function BizNavBar({ business }) {
    const { url } = useRouteMatch()

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div id="business-navbar">
            <div className='flex-row-justify-between flex-row-align-center w70'>
                    <NavLink 
                        className="navLink-bluegreen header text20" 
                        activeClassName='tab-active' to={`${url}/about`}
                    >About</NavLink>
                    <NavLink 
                        className="navLink-bluegreen header text20" 
                        activeClassName='tab-active' to={`${url}/reviews`}
                    >Reviews</NavLink>
                    {/* <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/photos`}>Photos</NavLink> */}
                    <NavLink 
                        className="navLink-bluegreen header text20" 
                        activeClassName='tab-active' 
                        to={`${url}/edit/info`} 
                        style={{ visibility: `${sessionUser && sessionUser.id === business.ownerId ? "visible" : "hidden"}` }}
                    >Edit</NavLink>
            </div>
        </div>
    )

}

export default BizNavBar
