import React, { useEffect, useState } from "react";
import { getAmenities } from "../../../store/fetchFunctions";
import './amenityInfo.css'

function AmenityInfo({ business }){

    const [amenities, setAmenities] = useState([])

    useEffect(() => {
        getAmenities().then((data) =>
            setAmenities(data.amenities)
        )
    }, [])

    console.log(amenities)
    console.log(business.amenities)
    const checkmark = <i className="fa-solid fa-check"></i>;
    const xmark = <i className="fa-solid fa-x"></i>;


    return (
        <div id='amenities-context'className="border-top-black-2px">
            <h2>Amenities and More</h2>
                <ul>
                    <div id='all-amenities'>
                        {amenities.map(amenity => {
                            return (
                                <div className={business.amenities.includes(amenity) ? 'has-amenity' : 'no-amenity'}id='each-amenity' key={amenity}>
                                    <div >
                                        {business.amenities.includes(amenity) ? checkmark : xmark}
                                    </div>
                                    <div id='actual-amenity'>
                                        {amenity}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ul>

        </div>

    )
}

export default AmenityInfo
