import React, { useEffect, useState, useRef, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";
import { getBizThunk } from "../../../store/business";
import BizCard from "./businessCard";

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

    let name = query.get('name')
    let category = query.get('name')

    console.log(`The name is: ${name} and the category is: ${category}`)

    let businessSet = new Set()
    if(name){
        for (const business of businessList){
            if(business.name.toLowerCase().includes(name.toLowerCase())){
                console.log(`${business.name} was a name match!`)
                businessSet.add(business)
            }
        }
    }


    if(category){
        for (const business of businessList) {
            
            for(const bizcategory of business.categories){
                if (bizcategory.toLowerCase().includes(category.toLowerCase())) {
                    console.log(`${bizcategory} was a category match!`)
                    businessSet.add(business);
                    continue
                }
            }
        }
    }
    bizMatches.current = Array.from(businessSet)
    useEffect(() => {
        dispatch(getBizThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    console.log(`The matches being sent into the return are:`, bizMatches.current)

    if(!bizMatches.current.length){
        return(
            <div>No Search Results</div>
        )
    }
    
    return isLoaded && (
        // <div>
        //     {bizMatches.current.map(business => (
        //         <BizCard key={business.id} business={business} />
        //     ))}
        // </div>
        <div className="bizlist-page">
            <div className="all-results-text">All Results</div>
            <div >
                {bizMatches.current.map(business => (
                    <BizCard key={business.id} business={business} />
                ))}
            </div>
        </div>
    )
}

export default BizSearchList
