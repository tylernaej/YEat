import React, { useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { getBizThunk } from "../../../store/business";
import {PropagateLoader} from "react-spinners"
import BizCard from "./businessCard";
import BizList from ".";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


function BizSearchList() {
    const dispatch = useDispatch()
    const businesses = useSelector(state => state.businesses)
    const businessList = Object.values(businesses)
    const query = useQuery()
    const bizMatches = useRef([])
    const[isLoaded, setIsLoaded] = useState(false)
    const [spinLoaded, setSpinLoaded] = useState(false)

    let name = query.get('name')
    let category = query.get('name')

    let businessSet = new Set()
    let categorySet = new Set()

    if(name){
        for (const business of businessList){
            if(business.name.toLowerCase().includes(name.toLowerCase())){
                businessSet.add(business)
            }
        }
    }


    if(category){
        for (const business of businessList) {
            
            for(const bizcategory of business.categories){
                if (bizcategory.toLowerCase().includes(category.toLowerCase())) {
                    categorySet.add(bizcategory)
                    businessSet.add(business);
                    continue
                }
            }
        }
    }

    bizMatches.current = Array.from(businessSet)
    const categoriesArray = Array.from(categorySet)

    useEffect(() => {
        dispatch(getBizThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            setSpinLoaded(true)
          }, "1000")
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

    let greeting = ""
    if(categoriesArray.length){
        switch (String(categoriesArray.length)) {
            case '1':
                greeting = `${categoriesArray[0]} coming right up!`
                break
            case '0':
                greeting = `${greetings[Math.floor(Math.random() * greetings.length)]}`
                break
            default:
                greeting = `${categoriesArray[0]} & more coming right up!`
        }
    }

    if(!spinLoaded){
        return(
            <div id='loader'>
                <div id='loader-greeting'>
                    {greeting}
                </div>
                <div>
                    <PropagateLoader 
                        color="#ED161F" 
                        size={20}
                        speedMultiplier={1.5}
                    />
                </div>
            </div>
        )
    }

    if(!bizMatches.current.length){
        return(
            <BizList/>
        )
    }
    
    return isLoaded && (
        <div className="bizlist-page">
            <div className="all-results-text">Showing {bizMatches.current.length} results:</div>
            <div >
                {bizMatches.current.map(business => (
                    <BizCard key={business.id} business={business} />
                ))}
            </div>
        </div>
    )
}

export default BizSearchList
