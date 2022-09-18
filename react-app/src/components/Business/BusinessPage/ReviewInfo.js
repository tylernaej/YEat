import React from "react";

function ReviewInfo({ business }) {
    // maybe get reviews by using the useSelector to get reviews by business id and filter
    const rating1 = business.reviews.filter(review => review.rating === 1).length
    const rating2 = business.reviews.filter(review => review.rating === 2).length
    const rating3 = business.reviews.filter(review => review.rating === 3).length
    const rating4 = business.reviews.filter(review => review.rating === 4).length
    const rating5 = business.reviews.filter(review => review.rating === 5).length
    const maxRating = Math.max([rating1, rating2, rating3, rating4, rating5])

    return (
        <div style={{width: "750px"}}>
            <h2>Reviews</h2>
            <div className="w100 flex-row">
                <div className="w30">
                    <div>
                        <p>Overall rating</p>
                        <p>{business.avgReviews}</p>
                        <p>{business.numReviews}</p>
                    </div>
                </div>
                <div className="w70 flex-column">
                    <div className="flex-row">
                        <div className="w30"><p>5 stars</p></div>
                        <div className="w70"><div style={{width:`${(maxRating / rating5) * 100}%`, backgroundColor:"red"}}></div></div>
                    </div>
                    <div className="flex-row">
                        <div><p>4 stars</p></div>
                        <div><div></div></div>
                    </div>
                    <div className="flex-row">
                        <div><p>3 stars</p></div>
                        <div><div></div></div>
                    </div>
                    <div className="flex-row">
                        <div><p>2 stars</p></div>
                        <div><div></div></div>
                    </div>
                    <div className="flex-row">
                        <div><p>1 stars</p></div>
                        <div><div></div></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewInfo
