import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function EditIndividualAmenityButton({amenity, checkedState, setCheckedState, included}){
    const [amenityChecked, setAmenityChecked] = useState(included)
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
            <div>{amenity}</div>
        </div>
    )
}

export default EditIndividualAmenityButton
