import React, { useEffect, useState, Dispatch } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBizThunk } from "../../../../store/business";
import './component.css'

function PopulateValidBizDetails({populatedValidDetails, setPopulatedValidDetails}){
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
            if(business.name === 'My Test Business'){
                alert('You\'ve already created that business!')
                found = true
                history.push(`/businesses/${business.id}/edit/info`)
            }
        }
        if(!found){
            const testBusiness = {
                pressed: true,
                businessDetails: {
                    name: 'My Test Business',
                    email: 'demoUserBusiness@aa.io',
                    phone: '(555) 555-5555',
                    website: "https://www.yelp.com/",
                    address: "123 Business Road",
                    city: "LA",
                    state: 'California',
                    zipcode: '90012',
                    country: 'USA',
                    latitude: 34,
                    longitude: -118,
                    description: "This was the business that was created by you when you used the 'Populate Valid Information' button!",
                    priceRange: 2
                }
            }
            setPopulatedValidDetails(testBusiness)
        }
    }

    return(
        <div onClick={handleClick} id='populate-information'>Populate Valid Information</div>
    ) 
}

export default PopulateValidBizDetails