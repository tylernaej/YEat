import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAmenities, postAmenities} from '../../../../store/fetchFunctions'
import IndividualAmenityButton from "./IndividualAmenityButton";
import { readBizThunk } from "../../../../store/business";
import HeaderInfo from "../../BusinessPage/HeaderInfo";
import './SetAmenities.css'

function SetBizAmenities(){
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

        history.push(`/create-business/${id}/categories`)
    }

    const handleBack = () => {
        history.push(`/businesses/${id}/edit`)
    }

    return isLoaded &&  (
        <div id="full-page-amenities">
            <h3>What amenities do you offer? (Step 2 of 3)</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div id='amenities-form'>
                        <div id="set-all-amenities">
                            {amenities.amenities.map(amenity => (
                                <div key={`${amenity}`}>
                                    <IndividualAmenityButton
                                        amenity={amenity}
                                        checkedState={checkedState}
                                        setCheckedState={setCheckedState}
                                    />
                                </div>
                            ))}
                        </div>
                        <div id="set-amenities-button" className="flex-row-justify-between">
                            <button onClick={handleBack} >Go Back</button>
                            <button type='submit'>Continue</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetBizAmenities
