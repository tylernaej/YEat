import React from "react";
import profileImage from "../../../src/assets/ProfileDefault-removebg-preview.png";

function ReviewCard({ review }) {


    // console.log(review)
    console.log(review.timeCreated.split(' ').slice(1, 3));

    return (
        <div>
            <div>
                <div>
                    {/* user information */}
                    <div id="profile-image-wrapper">
                         <img id='profile-image' src={review.reviewer.profilePicture ? review.reviewer.profilePicture : profileImage} alt={review.reviewer.firstName} />
                    </div>
                    <div>{review.reviewer.firstName} {review.reviewer.lastName}</div>
                    <div></div>
                </div>
                <div>
                    {review.rating} {review.timeCreated.split(' ').slice(1, 4).join(' ')}
                </div>
            </div>
            <div>{review.review}</div>
        </div>
    )
}

export default ReviewCard
