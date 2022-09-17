import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

import { readBizThunk } from "../../../store/business";

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
            {business.name}
        </div>
    )
}

export default BizPage
