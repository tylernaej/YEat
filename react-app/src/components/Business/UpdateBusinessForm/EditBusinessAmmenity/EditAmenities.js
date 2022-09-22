import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditIndividualAmenityButton from "./EditIndividualAmenityButton";

import {getAmenities, postAmenities} from '../../../../store/fetchFunctions'

function EditBizAmenities({ business, setBizAmenities }){
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const id = Number(location.pathname.split('/')[2])

    const [amenities, setAmenities] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [checkedState, setCheckedState] = useState({})

    useEffect(() => {
        getAmenities()
        .then((data) => setAmenities(data))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        let newState = {}

        for(const amenity of business.amenities){
            newState[`${amenity}`] = true
        }

        setCheckedState(newState)
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        setBizAmenities(Object.keys(checkedState))

        const request = {id, amenityPayload: checkedState}

        await dispatch(postAmenities(request))

        history.push(`/businesses/${id}/about`)
    }

    return isLoaded &&  (
        <div id="full-page-amenities" style={{width: "100%"}}>
            <h3>What amenities do you offer?</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div id='amenities-form'>
                        <div id="set-all-amenities">
                            {amenities.amenities.map(amenity => (
                                <div key={`${amenity}`}>
                                    <EditIndividualAmenityButton
                                        included={business.amenities.includes(amenity)}
                                        amenity={amenity}
                                        checkedState={checkedState}
                                        setCheckedState={setCheckedState}
                                    />
                                </div>
                            ))}
                        </div>
                        <div id="set-amenities-button" className="flex-row-justify-between">
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBizAmenities
