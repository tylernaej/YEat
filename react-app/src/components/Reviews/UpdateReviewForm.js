import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getReview } from "../../store/fetchFunctions";
import { updateReviewThunk, deleteReviewThunk } from "../../store/reviews";

function UpdateReviewForm(  ){
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams();
    const [unEditedReview, setUnEditedReview] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const isMounted = useRef(false)

    useEffect(() => {
      getReview(reviewId)
      .then((data) => setUnEditedReview(data))
      .then(() => setIsLoaded(true))
    }, [])

    console.log(unEditedReview.rating);
    console.log(unEditedReview.review);


    const [rating, setRating] = useState(unEditedReview?.rating);
    const [review, setReview] = useState(unEditedReview?.review);

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
      const errors = [];

      setValidationErrors(errors);
    }, [review, rating]);

    useEffect(() => {
      if (isMounted && isLoaded) {
        setRating(unEditedReview.rating);
        setReview(unEditedReview.review);
      } else {
        isMounted.current = true;
      }
    }, [unEditedReview]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);

      if (validationErrors.length > 0) return;

      const updatedReview = {
        rating,
        review,
      };

      const payload = { reviewId, review: updatedReview };

      const data = await dispatch(updateReviewThunk(payload));
      // console.log(data);
      // console.log(review)
      history.push(`/businesses/${unEditedReview.businessId}/about`);
    };

    const handleDelete = async e => {
      e.preventDefault()
      await dispatch(deleteReviewThunk(reviewId))
      history.push(`/businesses/${unEditedReview.businessId}/reviews`)
    }

    const handleCancel = async e => {
      e.preventDefault()
      history.push(`/businesses/${unEditedReview.businessId}/reviews`);
    }

    if (!unEditedReview){
      return null
    }

    return isLoaded &&(
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            required
            placeholder="1-5"
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
        <div>
          <button onClick={handleCancel}>Cancel</button>
          <button type="submit">Submit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>
    );
}

export default UpdateReviewForm