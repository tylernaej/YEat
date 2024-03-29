import React, { useEffect, useState, useRef } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getReview } from "../../store/fetchFunctions";
import { updateReviewThunk, deleteReviewThunk } from "../../store/reviews";
import './UpdateReviewForm.css'
import {Modal} from '../../context/Modal'
import DeleteReviewButton from "./DeleteReviewModal";

function UpdateReviewForm( {usersReview} ){
    const dispatch = useDispatch();
    const history = useHistory();

    const [rating, setRating] = useState('');
    const [review, setReview] = useState(usersReview?.review || '');

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
      const errors = [];
       if (review.length < 10 || review.length > 2000) errors.push("Review length must be between 10 and 2000 characters")
       if (!rating) errors.push("Please provide a rating");

      setValidationErrors(errors);
    }, [review, rating]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);

      if (validationErrors.length > 0) return;

      const updatedReview = {
        rating,
        review,
      };

      const payload = { reviewId: usersReview.id, review: updatedReview };

      const data = await dispatch(updateReviewThunk(payload));
      
      if (data.statusCode){
        setValidationErrors([data.message])
        return
      }

      history.push(`/businesses/${usersReview.businessId}/reviews`);
    };

    const handleDelete = async e => {
      e.preventDefault()
      const data = await dispatch(deleteReviewThunk(usersReview.id));

      if (data.statusCode){
        setValidationErrors([data.message])
        return
      }
      
      history.push(`/businesses/${usersReview.businessId}/reviews`)
    }

    const handleCancel = async e => {
      e.preventDefault()
      history.push(`/businesses/${usersReview.businessId}/reviews`);
    }

    const handleClick = (e) => {
      e.preventDefault();
      setShowModal(true);
      // console.log(e);
    };

    if (!usersReview) {
      return null;
    }

    return (
      // isLoaded && (
      <div className="whole-bottom-page">
        <div>
          <h3>Edit review here!</h3>
        </div>
        {hasSubmitted &&
          validationErrors.map((error) => (
            <div className="error" key={error}>
              <li>{error}</li>
            </div>
          ))}
        <div className="whole-review-form">
          <form onSubmit={handleSubmit}>
            <div id="rating-div" className="rating">
              {/* <div className="rating"> */}
              <input
                type="radio"
                name="rating"
                value="5"
                id="5"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="5">☆</label>
              <input
                type="radio"
                name="rating"
                value="4"
                id="4"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="4">☆</label>
              <input
                type="radio"
                name="rating"
                value="3"
                id="3"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="3">☆</label>
              <input
                type="radio"
                name="rating"
                value="2"
                id="2"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="2">☆</label>
              <input
                type="radio"
                name="rating"
                value="1"
                id="1"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="1">☆</label>
            </div>
            {/* <div id="rating-div">
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
            </div> */}
            <div id="review-div">
              {/* <label htmlFor="review">Review</label> */}
              <textarea
                id="review-input"
                required
                placeholder="The ramen here is perfect! The prices are really great too. I like the system where they let you choose any toppings and all of the soup bases are really great. I like no matter which mixes of bases and toppings you get they always mix well. I would suggest to get green onions and eggs on top of your ramen it really pulls and melts everything together. This place is a perfect place to have a casual date with your significant other, especially if you go at night because of the lights that turn on that are hung out side of the restaurant it really adds a romantic setting to the atmosphere."
                type="text"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div id="update-review-edit-button-div">
              <button onClick={handleCancel}>Cancel</button>
              {/* <button onClick={handleDelete}>Delete</button> */}
              <button onClick={handleClick}>Delete</button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  {/* <DeleteBizButton business={business} setIsLoaded={setIsLoaded} setValidationErrors={setValidationErrors} setShowModal={setShowModal}/> */}
                  <DeleteReviewButton setValidationErrors={setValidationErrors} usersReview={usersReview} setShowModal={setShowModal}/>
                </Modal>
              )}
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default UpdateReviewForm
