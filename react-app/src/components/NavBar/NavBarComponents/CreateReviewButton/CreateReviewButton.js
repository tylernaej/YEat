import React from "react";
import { NavLink } from "react-router-dom";
import './component.css'

function CreateReviewButton() {
  return (
    <div>
      <NavLink to="/businesses/reviews/search" id='create-review'>Write a Review</NavLink>
      {/* create review button */}
    </div>
  );
}

export default CreateReviewButton;