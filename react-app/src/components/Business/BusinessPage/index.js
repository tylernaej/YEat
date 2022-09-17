import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

import { readBizThunk } from "../../../store/business";

//components
import AboutInfo from "./AboutInfo";
import AmenityInfo from "./AmenityInfo";
import ContactInfo from "./ContactInfo";
import HeaderInfo from "./HeaderInfo";
import ReviewInfo from "./ReviewInfo";
import Reviews from "./Reviews";


function BizPage() {
    const { businessId } = useParams()

    const dispatch = useDispatch()

    const businesses = useSelector(state => state.businesses)
    const business = businesses[Number(businessId)]

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(readBizThunk(businessId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            <HeaderInfo business={business} />
            <div>
                <AboutInfo business={business} />
                <AmenityInfo business={business} />
                <ReviewInfo business={business} />
                <Reviews business={business} />
            </div>
            <div>
                <ContactInfo business={business} />
            </div>
        </div>
    )
}

export default BizPage
