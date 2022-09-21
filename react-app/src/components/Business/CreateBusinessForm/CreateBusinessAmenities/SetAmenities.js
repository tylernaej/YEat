import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAmenities, postAmenities} from '../../../../store/fetchFunctions'
import IndividualAmenityButton from "./IndividualAmenityButton";
import { readBizThunk } from "../../../../store/business";
import HeaderInfo from "../../BusinessPage/HeaderInfo";

function SetBizAmenities(){
    const dispatch = useDispatch()
    const [amenities, setAmenities] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [checkedState, setCheckedState] = useState({})
    const history = useHistory()
    const location = useLocation()
    const id = Number(location.pathname.split('/')[2])

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
        console.log(`The biz id in the handle submit is: ${id}`)
        const request = {id, amenityPayload}

        console.log(request)
        await dispatch(postAmenities(request))

        history.push(`/create-business/${id}/categories`)
    }

    const handleBack = () => {
        history.push(`/businesses/${id}/edit`)
    }

    return isLoaded &&  (
        <div>
            <h3>Set Amenities Here</h3>
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
                    <button onClick={handleBack} >Go Back</button>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SetBizAmenities
