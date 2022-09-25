import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import {ClimbingBoxLoader, PropagateLoader} from "react-spinners"
import './index.css'


import { getBizThunk } from "../../../store/business";

import BizCard from "./businessCard";


function BizList() {
    const dispatch = useDispatch()
    const businesses = useSelector(state => state.businesses)
    const businessList = Object.values(businesses)
    const [spinLoaded, setSpinLoaded] = useState(false)

    const [isLoaded, setIsLoaded] = useState(false)
 

    useEffect(() => {
        dispatch(getBizThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            setSpinLoaded(true)
          }, "800")
    }, [])

    if(!spinLoaded){
        return(
            <div id='loader'>
                <PropagateLoader 
                    color="#ED161F" 
                    size={20}
                    speedMultiplier={1.7}
                />
            </div>
        )
    }

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
