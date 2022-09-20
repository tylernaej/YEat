import React, { useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import {getBizThunk} from '../../store/business'
import BizCard from "../Business/BusinessList/businessCard";

function SplashPage() {
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
            <div>
                Welcome to YEat
            </div>
            <div>
            {businessList.map(business => (
                <BizCard key={business.id} business={business} />
            ))}
        </div>
        </div>
    )
}

export default SplashPage
