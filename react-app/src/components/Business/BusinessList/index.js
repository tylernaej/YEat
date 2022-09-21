import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import './index.css'


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
        <div className="bizlist-page">
            <div className="all-results-text">All Results</div>
            <div >
                {businessList.map(business => (
                    <BizCard key={business.id} business={business} />
                ))}
            </div>
        </div>
    )
}

export default BizList
