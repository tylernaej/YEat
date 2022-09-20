import React from "react";
import profileImage from "../../../src/assets/ProfileDefault-removebg-preview.png";
import UpdateReviewForm from "./UpdateReviewForm";
import { NavLink } from "react-router-dom";

function ReviewCard({ review }) {

    return (
        <div className="border-top-black-2px verticalMargin15 padding10">
            <div>
                <div className="flex-row-align-center">
                    {/* user information */}
                    <div id="profile-image-wrapper">
                        <img id='profile-image' src={review.reviewer.profilePicture ? review.reviewer.profilePicture : profileImage} alt={review.reviewer.firstName} />
                    </div>
                    <div className="padding5">
                        <h4>
                            {review.reviewer.firstName} {review.reviewer.lastName[0]}.
                        </h4>
                    </div>
                </div>
                <div>
                    <NavLink to={`/reviews/${review.id}/edit`}>Edit</NavLink>
                </div>
                <div>
                    <span className="textcolor-grey">
                        Rating: {review.rating} - {review.timeCreated.split(' ').slice(1, 4).join(' ')}
                    </span>
                </div>
            </div>
            <div>
                <p>
                    {review.review}
                </p>
            </div>
        </div>
    )
}

export default ReviewCard
