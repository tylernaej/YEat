import React from "react";

function ReviewCard({ review }) {
    return (
        <div>
            <div>
                <div>
                    {/* user information */}
                    <div></div>
                    <div></div>
                </div>
                <div>
                    {/* drop down menu */}
                </div>
            </div>
            <div>{review.review}</div>
        </div>
    )
}

export default ReviewCard
