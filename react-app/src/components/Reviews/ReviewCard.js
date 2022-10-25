import React from "react";
import profileImage from "../../../src/assets/ProfileDefault-removebg-preview.png";
import UpdateReviewForm from "./UpdateReviewForm";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

function ReviewCard({ review }) {
    // console.log(bizUrl)
    // const {url} = useRouteMatch()
    // console.log(review)

    const sessionUser = useSelector(state => state.session.user)
    const images = useSelector(state => state.reviews)
    // console.log(images)
    console.log(review)

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
                    {/* <NavLink style={ { visibility: `${sessionUser && sessionUser.id === review.userId ? 'visible' : 'hidden'}` } } to={`/$/edit-review`}>Edit</NavLink> */}
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
            <div className="images-map-outer">
                {review.images?.map((image, i) => (
                    <div className="images-map"key={i}>
                        <img className="review-image"src={image.url || image} alt=''/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewCard
