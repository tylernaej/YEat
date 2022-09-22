import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditIndividualAmenityButton from "./EditIndividualAmenityButton";

import {getAmenities, postAmenities} from '../../../../store/fetchFunctions'

function EditBizAmenities({ business }){
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

    const handleSubmit = async e => {
        e.preventDefault()
        let amenityPayload = {}

        for (const amenity in checkedState){
            amenityPayload[`${amenity}`] = true
        }

        const request = {id, amenityPayload}

        await dispatch(postAmenities(request))

        history.push(`/businesses/${id}/about`)
    }

    return isLoaded &&  (
        <div id="full-page-amenities">
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
