import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { getBizReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";

function ReviewsList({ business }){
    const dispatch = useDispatch()

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      dispatch(getBizReviewThunk(business.id))
        .then(() => setIsLoaded(true));

    }, [dispatch]);

    return isLoaded && (
        <div>
            {reviewsList.map(review => (
                <ReviewCard review={review} key={review.id}/>
            ))}
        </div>
    )
}

export default ReviewsList
