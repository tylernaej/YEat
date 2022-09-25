import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import {PropagateLoader} from "react-spinners"
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

    const greetings = [
        "Hungry?",
        "Tacos aren't limited to Tuesdays...",
        "What's your eating Mood today?",
        "Think Food, Think us",
        "Y-Eat? Y Not?",
        "For those who live to eat",
        "It could be cheat day?",
        "Say yes to yumm",
        "Keep calm!! its food time!",
        "We value your taste",
        "Did someone say pizza?",
    ]

    if(!spinLoaded){
        return(
            <div id='loader'>
                <div id='loader-greeting'>
                    <div>{`${greetings[Math.floor(Math.random() * greetings.length)]}`}</div>
                </div>
                <div>
                    <PropagateLoader 
                        color="#ED161F" 
                        size={20}
                        speedMultiplier={1.7}
                    />
                </div>
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
