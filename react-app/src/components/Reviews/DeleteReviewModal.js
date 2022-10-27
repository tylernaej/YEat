import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import './DeleteBusinessButton.css'
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReviewButton({setValidationErrors, usersReview, setShowModal}){
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
     }

    const handleDelete = async (e) => {
    //   e.preventDefault();
      const data = await dispatch(deleteReviewThunk(usersReview.id));

      if (data.statusCode > 200) {
        setValidationErrors([data.message]);
        // console.log('have an error')
        return;
      }
      // console.log('successfully deleted')

      history.push(`/businesses/${usersReview.businessId}/reviews`);
    };

    return (
    <div className="whole-modal">
      {/* <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )} */}
      <div className="header-modal">
        <h3>Are you sure you want to delete your review?</h3>
      </div>
      <div className="confirm-delete">
        <button className='cancel-button' onClick={handleClick}>Cancel</button>
        <button className='confirm-button' onClick={handleDelete}>Confirm Delete</button>
      </div>
    </div>
  );

}

export default DeleteReviewButton