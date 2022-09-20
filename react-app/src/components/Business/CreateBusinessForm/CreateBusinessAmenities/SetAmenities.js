import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAmenities, postAmenities} from '../../../../store/fetchFunctions'
import IndividualAmenityButton from "./IndividualAmenityButton";

function SetAmenities({business}){
    const dispatch = useDispatch()
    const [amenities, setAmenities] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [checkedState, setCheckedState] = useState({})
    const history = useHistory()

    const id = 1
    
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
        
        console.log(request)
        await dispatch(postAmenities(request))

        // history.push(`/businesses/${id}/about`)

        //render the categories and hide the amenities
    }

    return isLoaded &&  (
        <div>
            <div>Set Amenities Here</div>
            <div>
                <form onSubmit={handleSubmit}>
                    {amenities.amenities.map(amenity => (
                        <div key={`${amenity}`}>
                            <IndividualAmenityButton 
                                amenity={amenity} 
                                checkedState={checkedState} 
                                setCheckedState={setCheckedState}
                            />
                        </div>
                    ))}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SetAmenities