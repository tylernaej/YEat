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
    const [isLoaded, setIsLoaded] = useState(false)
    const [businessMatches, setBusinessMatches] = useState(businessList)
    // const [nameChecked, setNameChecked] = useState(false)
    // const [categoryChecked, setCategoryChecked] = useState(false)
    const bisMatches = useRef(businessList)
    const nameChecked = useRef(false)
    const categoryChecked = useRef(false)


    let name = query.get('name')
    let category = query.get('name')

    console.log(`The name is: ${name} and the category is: ${category}`)

    console.log(`The useRefs are: ${nameChecked.current} and ${categoryChecked.current}`)

    let businessArray = []

    if(name && nameChecked.current){
        nameChecked.current = true
        for (const business of businessList){
            if(business.name.toLowerCase().includes(name.toLowerCase())){
                console.log(`${business.name} was a name match!`)
                businessArray.push(business)
            }
        }
    }

    if(category && categoryChecked.current){
        categoryChecked.current = true
        for (const business of businessList) {
            
            for(const bizcategory of business.categories){
                if (bizcategory.toLowerCase().includes(category.toLowerCase())) {
                    console.log(`${bizcategory} was a category match!`)
                    businessArray.push(business);
                }
            }
        }
    }
    
    if(nameChecked.current && categoryChecked.current) {
        setBusinessMatches(businessArray)
    }
    // useEffect(() => {
    //         let businessSet = new Set();
    //         // console.log(searchName.length)
    //         // console.log(searchCategory.length)
    //         if (name) {
    //             setIsQuery(true)
    //           for (const business of businessList) {
    //             if (
    //               business.name.toLowerCase().includes(name.toLowerCase())
    //             ) {
    //               console.log('decoration', business);
    //               businessSet.add(business);
    //             }
            
    //           }
    //         }
    
    //         if (category) {
    //             setIsQuery(true)
    //           for (const business of businessList) {
    //             for (const category of business.categories) {
    //               if (
    //                 category.toLowerCase().includes(category.toLowerCase())
    //               ) {
    //                 businessSet.add(business);
    //               }
    //             }
    //           }
    //         }
    //         // console.log('business set length', businessSet.size)
    //         console.log('11111111111', businessList)
    
            
    
    //         if(businessSet.size > 0) {
    //              setBusinessMatches(Array.from(businessSet));
    //         }
        


    // }, [dispatch])

    
    // if(!busi)
    console.log(businessMatches)
    
    return isLoaded && (
        <div>
            {businessList.map(business => (
                <BizCard key={business.id} business={business} />
            ))}
        </div>
    )
}

export default BizSearchList
