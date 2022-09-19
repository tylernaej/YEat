import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom";

import { getBizThunk } from "../../../store/business";

import BizCard from "./businessCard";

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


function BizList() {
    const dispatch = useDispatch()
    const businesses = useSelector(state => state.businesses)
    const businessList = Object.values(businesses)

    const [isLoaded, setIsLoaded] = useState(false)

    console.log(useQuery().get('name'))
    console.log(useQuery().get('category'))

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
