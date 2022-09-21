import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getBizReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";

function ReviewsList({ reviewsList }){
    const reviewsListByDate = reviewsList.slice().reverse()

    return (
        <div>
            {reviewsListByDate.map(review => (
                <ReviewCard review={review} key={review.id}/>
            ))}
        </div>
    )
}

export default ReviewsList
