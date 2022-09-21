import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createReviewThunk } from "../../store/reviews";

function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { businessId } = useParams()
    const location = useLocation()

    const businessId = location.pathname.split('/')[2]
    // console.log(businessId)
    // const business = useSelector((state) => console.log(state))
    const sessionUser = useSelector(state => state.session.user)

    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')

    const [validationErrors, setValidationErrors] = useState([]);
    // const [backendErrors, setBackendErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    let backendErrors = []

    useEffect(() => {
        const errors = []
        if (review.length < 10 || review.length > 2000) errors.push("Review length must be between 10 and 2000 characters")

        setValidationErrors(errors)
    }, [rating, review])


    const handleSubmit = async e => {
        e.preventDefault()
        // console.log('testestestest')

        setHasSubmitted(true)
        // console.log(validationErrors)

        if(validationErrors.length > 0) return

        const newReview = {
            rating,
            review
        }

        const reviewer = { firstName: sessionUser.firstName, lastName: sessionUser.lastName, profilePicture: sessionUser.profilePicture}

        const payload = {businessId, review: newReview, reviewer}

        const data = await dispatch(createReviewThunk(payload))

        if(data.statusCode === 403){
          setValidationErrors([data.message])

          return
        }
        // if(statusCode)

        history.push(`/businesses/${businessId}/reviews`)
    }

    return (
      <div>
        {hasSubmitted && validationErrors.map(error => (
          <div key={error}>{error}</div>
        ))}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              required
              placeholder="1-5"
              min={1}
              max={5}
              type="number"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="review">Review</label>
            <textarea
              required
              placeholder="Write review here"
              type="text"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default ReviewForm
