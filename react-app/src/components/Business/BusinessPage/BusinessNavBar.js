import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch, useParams } from "react-router-dom";

function BizNavBar({ business }){
    const { url } = useRouteMatch()

    const sessionUser = useSelector(state => state.session.user)

    console.log(sessionUser, business)

    return (
        <div className='flex-row-center w70'>
            <div className='flex-row-justify-between flex-row-align-center w70'>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/about`}>About</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/reviews`}>Reviews</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/photos`}>Photos</NavLink>
                <NavLink className="navLink-bluegreen header text20" activeClassName='tab-active' to={`${url}/edit`} style={{ visibility: `${sessionUser && sessionUser.id === business.ownerId ? "visible" : "hidden"}` }}>Edit</NavLink>
            </div>
        </div>
    )

 }

export default BizNavBar