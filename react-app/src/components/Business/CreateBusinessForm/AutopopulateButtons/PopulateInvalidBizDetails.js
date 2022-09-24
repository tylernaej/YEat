import React, { useEffect, useState, Dispatch } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBizThunk } from "../../../../store/business";
import './component.css'

function PopulateInvalidBizDetails({populatedValidDetails, setPopulatedValidDetails}){
    const dispatch = useDispatch()
    const [businesses, setBusinesses] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()

    useEffect(() =>{
        dispatch(getBizThunk())
        .then((data) => {setBusinesses(data)})
        .then(() => setIsLoaded(true)) 
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        let found = false
        for (const business of businesses.businesses){
            if(business.name === 'Failed Business'){
                alert('You\'ve already created that business!')
                found = true
                history.push(`/businesses/${business.id}/edit/info`)
            }
        }
        if(!found){
            const testBusiness = {
                pressed: true,
                businessDetails: {
                    name: 'Failed Business',
                    email: 'demoUserBusiness',
                    phone: '(555) 555-5555',
                    website: "https://www.yelp",
                    address: "123 Business Road",
                    city: "123 LA",
                    state: 'California',
                    zipcode: '900125',
                    country: 'USA',
                    latitude: 190,
                    longitude: -190,
                    description: "2 short",
                    priceRange: 6
                }
            }
            setPopulatedValidDetails(testBusiness)
        }
    }

    return(
        <div onClick={handleClick} id='populate-information'>Populate Invalid Information</div>
    ) 
}

export default PopulateInvalidBizDetails