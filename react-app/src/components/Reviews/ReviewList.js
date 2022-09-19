import React from "react";
import ReviewCard from "./ReviewCard";

function ReviewsList({ business }){
    const reviews = business.reviews
    // dispatch a fetch request for reviews of a business for more info
    return (
        <div>
            {reviews.map(review => (
                <ReviewCard review={review} key={review.id}/>
            ))}
        </div>
    )
}

export default ReviewsList
