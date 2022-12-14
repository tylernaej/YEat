import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './IndividualAmenities.css'

function IndividualAmenityButton({amenity, checkedState, setCheckedState}){
    const [amenityChecked, setAmenityChecked] = useState(false)
    const isMounted = useRef(false);

    const handleChecked = async e => {
        setAmenityChecked(current => !current)
    }

    useEffect(() => {

        if (isMounted.current) {
            let newState = {...checkedState}
            if(`${amenity}` in  newState && !amenityChecked){
                delete newState[`${amenity}`]
            }
            if(amenityChecked){
                newState[`${amenity}`] = amenityChecked
            }

            setCheckedState(newState)
        } else {
            isMounted.current = true;
        }
    }, [amenityChecked])

    return (
        <div id={amenityChecked ? 'amenity-button-true' : 'amenity-button-false'} className='flex-row amenity-button' onClick={handleChecked}>
            {/* <input
                style={{ width:"25px" }}
                type="checkbox"
                name={`${amenity}`}
                value={`${amenityChecked}`}
                onClick={handleChecked}
            /> */}
            <div>{amenity}</div>
        </div>
    )
}

export default IndividualAmenityButton
