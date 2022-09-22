import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsersBizThunk } from "../../../store/business";

import BizCard from "../BusinessList/businessCard";
import './UserBizList.css'

function UserBizList() {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => state.businesses);
  const sessionUser = useSelector((state) => state.session.user)
  const businessList = Object.values(businesses).filter(business => business.ownerId === sessionUser.id);

  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(getUsersBizThunk())
    .then(() => setIsLoaded(true))
}, [dispatch]);


    if(!businessList.length){
        return(
          <div className="no-biz-list">
            <h1>You have no businesses</h1>
          </div>
        ) 
    }
  

  return (
    isLoaded && (
      <div className="bizlist-page">
        <h3>Your Business</h3>
        {businessList.map((business) => (
          <BizCard key={business.id} business={business} />
        ))}
      </div>
    )
  );
}

export default UserBizList;
