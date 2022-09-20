import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateReviewThunk } from "../../store/reviews";

function UpdateReviewForm( {business} ){
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();
    // console.log(businessId)
    // const business = useSelector((state) => console.log(state))

    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
      const errors = [];

      setValidationErrors(errors);
    }, [rating, review]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("testestestest");

      setHasSubmitted(true);
      console.log(validationErrors);

      if (validationErrors.length > 0) return;

      const newReview = {
        rating,
        review,
      };

      const payload = { businessId: businessId, review: newReview };

      const data = await dispatch(updateReviewThunk(payload));
      console.log(data);

      history.push(`/businesses/${businessId}/about`);
    };

    return (
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
        <button type="submit">Submit</button>
      </form>
    );
}