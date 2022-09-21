import React, { useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import {getBizThunk} from '../../store/business'
import BizCard from "../Business/BusinessList/businessCard";

import splashImage1 from "../../assets/splash-image1.jpg"

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
                <img src={splashImage1} />
            </div>
        </div>
    )
}

export default SplashPage
