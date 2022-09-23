import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import './DropDownBizInfo.css'
import { getBizThunk } from "../../../../store/business";

function DropDownBizInfo({business, setUserInput, userInput}){
    const dispatch = useDispatch()
    const location = useLocation()
    const [endcard, setEndCard] =useState(false)
    const history = useHistory()

    let handleSubmit = async e =>{
        e.preventDefault()
        let params = {'name': userInput, 'category': userInput}
        await dispatch(getBizThunk(params))
        setUserInput("")
        const query = new URLSearchParams(params)
        history.push(`/businesses/search?${query.toString()}`)
    }

    if('endcard' in business && !endcard){
        console.log(business.endcard)
        setEndCard(true)
    }

    if(location.pathname.split('/')[2] === 'reviews'){
        return  (
        <div >
            <NavLink to={`/businesses/${business.id}/create-review`} id='result-navlink'>
                <div className="flex-row" id='individual-result'>
                    <div id='result-image'>
                        <div>Image</div>
                    </div>
                    <div id='result-details'>
                        <div id='search-result-name'>
                            {business.name}
                        </div>
                        <div id='search-result-address'>
                            {business.address}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
    }
    return  (
        <div >
            {!endcard && (
                <NavLink to={`/businesses/${business.id}/about`} id='result-navlink'>
                    <div className="flex-row" id='individual-result'>
                        <div id='result-image'>
                            <div>Image</div>
                        </div>
                        <div id='result-details'>
                            <div id='search-result-name'>
                                {business.name}
                            </div>
                            <div id='search-result-address'>
                                {business.address}
                            </div>
                        </div>
                    </div>
                </NavLink>
            )}
            {endcard && business.endcard == 'See all Results' && (
                <div id='see-all-results' onClick={handleSubmit}>{business.endcard}</div>
            )}
            {endcard && business.endcard == 'No Results' && (
                <div>{business.endcard}</div>
            )}    
        </div>
    )
}

export default DropDownBizInfo