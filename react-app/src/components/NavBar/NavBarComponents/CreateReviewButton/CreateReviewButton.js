import React from "react";
import { NavLink } from "react-router-dom";


function CreateReviewButton() {
  return (
    <div>
      <NavLink to="/businesses/reviews/search">Write a Review</NavLink>
      {/* create review button */}
    </div>
  );
}

export default CreateReviewButton;