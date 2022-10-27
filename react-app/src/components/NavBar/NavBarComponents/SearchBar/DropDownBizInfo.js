import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom';
import './DropDownBizInfo.css'
import { getBizThunk } from "../../../../store/business";

import defaultImage1 from "../../../../assets/defaultBusinessImages/business_default1.jpg"
import defaultImage2 from "../../../../assets/defaultBusinessImages/business_default2.jpg"
import defaultImage3 from "../../../../assets/defaultBusinessImages/business_default3.jpg"
import defaultImage4 from "../../../../assets/defaultBusinessImages/business_default4.jpg"
import defaultImage5 from "../../../../assets/defaultBusinessImages/business_default5.jpg"
import defaultImage6 from "../../../../assets/defaultBusinessImages/business_default6.jpg"
import defaultImage7 from "../../../../assets/defaultBusinessImages/business_default7.jpg"
import defaultImage8 from "../../../../assets/defaultBusinessImages/business_default8.jpg"
import defaultImage9 from "../../../../assets/defaultBusinessImages/business_default9.jpg"
import defaultImage10 from "../../../../assets/defaultBusinessImages/business_default10.jpg"

const defaultImages = [defaultImage1, defaultImage2, defaultImage3, defaultImage4, defaultImage5,
    defaultImage6, defaultImage7, defaultImage8, defaultImage9, defaultImage10]

function DropDownBizInfo({business, setUserInput, userInput}){
    const dispatch = useDispatch()
    const location = useLocation()
    const [endcard, setEndCard] =useState(false)
    const [visible, setVisible] = useState(false)
    const history = useHistory()
    const bizDefaultImg = defaultImages[business.id % defaultImages.length]

    let handleSubmit = async e =>{
        e.preventDefault()
        let params = {'name': userInput, 'category': userInput}
        await dispatch(getBizThunk(params))
        setUserInput("")
        const query = new URLSearchParams(params)
        history.push(`/businesses/search?${query.toString()}`)
    }

    if('endcard' in business && !endcard){
        // console.log(business.endcard)
        setEndCard(true)
    }

    let emptyString = ''
    if(business.categories){
        business.categories.forEach(category => {
            emptyString += `${category}, `
        })
    }
    const specialties = emptyString.slice(0, emptyString.length - 2)

    if(location.pathname.split('/')[2] === 'reviews'){
        return  (
        <div >
            <NavLink to={{ pathname:`/businesses/${business.id}/create-review`, business: {business}}} id='result-navlink'>
            <div id='result-parent'>
                        <div 
                            className="flex-row" 
                            id='individual-result'
                            onMouseEnter={() => setVisible(true)}
                            onMouseLeave={() => setVisible(false)}
                        >
                            <div id='result-details'>
                                {/* {visible && (
                                    <div>
                                        <img
                                            className="actual-image"
                                            id='default-image'
                                            src={`${bizDefaultImg}`} />
                                    </div>
                                )} */}
                                <div id='search-result-name'>
                                    {business.name} {visible? `- ${business.phone}` : null}
                                </div>
                                {visible && (
                                    <div id='search-result-specialties'>{specialties}</div>
                                )}
                                <div id='search-result-address'>
                                    {business.address}
                                </div>
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
                    <div id='result-parent'>
                        <div 
                            className="flex-row" 
                            id='individual-result'
                            onMouseEnter={() => setVisible(true)}
                            onMouseLeave={() => setVisible(false)}
                        >
                            <div id='result-details'>
                                {/* {visible && (
                                    <div>
                                        <img
                                            className="actual-image"
                                            id='default-image'
                                            src={`${bizDefaultImg}`} />
                                    </div>
                                )} */}
                                <div id='search-result-name'>
                                    {business.name} {visible? `- ${business.phone}` : null}
                                </div>
                                {visible && (
                                    <div id='search-result-specialties'>{specialties}</div>
                                )}
                                <div id='search-result-address'>
                                    {business.address}
                                </div>
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