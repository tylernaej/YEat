import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getBizThunk } from "../../../store/business";

import BizCard from "./businessCard";

function BizList() {
    const dispatch = useDispatch()
    const businesses = useSelector(state => state.businesses)
    const businessList = Object.values(businesses)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getBizThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            {businessList.map(business => (
                <BizCard key={business.id} business={business} />
            ))}
        </div>
    )
}

export default BizList
