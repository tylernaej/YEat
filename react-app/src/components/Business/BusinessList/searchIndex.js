import React, { useEffect, useState } from "react";
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
    console.log('business', businessList)

    const [isLoaded, setIsLoaded] = useState(false)
    const [businessMatches, setBusinessMatches] = useState(businessList)
    // const [searchName, setSearchName] = useQueryParam("name", StringParam);
    // const [searchCategory, setSearchCategory] = useQueryParam("category", StringParam);
    const [isQuery, setIsQuery] = useState(false)
    // console.log(useQuery().get('name'))
    // console.log(useQuery().get('category'))
    let name = query.get('name')
    let category = query.get('name')
    // let businessSet = new Set()
    // if(searchName){
    //     for (const business of businessList){
    //         if(business.name.toLowerCase().includes(searchName.toLowerCase())){
    //             businessSet.add(business)
    //         }
    //     }
    // }

    // if(searchCategory){
    //     for (const business of businessList) {
    //         for(const category of business.categories){
    //             if (category.toLowerCase().includes(searchCategory.toLowerCase())) {
    //               businessSet.add(business);
    //             }
    //         }
    //     }
    // }


    useEffect(() => {
        dispatch(getBizThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])
    

    useEffect(() => {
            let businessSet = new Set();
            // console.log(searchName.length)
            // console.log(searchCategory.length)
            if (name) {
                setIsQuery(true)
              for (const business of businessList) {
                if (
                  business.name.toLowerCase().includes(name.toLowerCase())
                ) {
                  console.log('decoration', business);
                  businessSet.add(business);
                }
            
              }
            }
    
            if (category) {
                setIsQuery(true)
              for (const business of businessList) {
                for (const category of business.categories) {
                  if (
                    category.toLowerCase().includes(category.toLowerCase())
                  ) {
                    businessSet.add(business);
                  }
                }
              }
            }
            // console.log('business set length', businessSet.size)
            console.log('11111111111', businessList)
    
            
    
            if(businessSet.size > 0) {
                 setBusinessMatches(Array.from(businessSet));
            }
        


    }, [dispatch])

    
    // if(!busi)
    console.log(businessMatches)
    
    if(isQuery){
        return (
          isLoaded && (
            <div>
              {businessMatches.map((business) => (
                <BizCard key={business.id} business={business} />
              ))}
            </div>
          )
        );
    }

    return isLoaded && (
        <div>
            {businessList.map(business => (
                <BizCard key={business.id} business={business} />
            ))}
        </div>
    )
}

export default BizSearchList
