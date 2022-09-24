
// import { Modal } from "../../context/Modal";
import React, { useEffect, useState, useRef } from "react";
import { deleteBizThunk } from "../../../../store/business";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './DeleteBusinessButton.css'

function DeleteBizButton({business, setIsLoaded, setValidationErrors, setShowModal}) {
  const isMounted = useRef(false)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
       e.preventDefault();
       setIsLoaded(false);
       const data = await dispatch(deleteBizThunk(business.id));

       if (data.statusCode) {
         setValidationErrors([data.message]);
         return
       }
       history.push('/businesses');
     };

  const handleClick = e => {
    e.preventDefault()
    setShowModal(false);
  }

  // useEffect(() => {
  //   if(isMounted.current){
  //     history.push('/businesses');
  //   }
  //   else {
  //     isMounted.current = true
  //   }
  // }, [setShowModal])

  return (
    <div className="whole-modal">
      <div className="header-modal">
        <div>
          <h3 id='header-text'>Are you sure you want to remove</h3>
          <h3>{business.name}?</h3>
        </div>
      </div>
      <div className="confirm-delete">
        <button className='cancel-button' onClick={handleClick}>Cancel</button>
        <button className='confirm-button' onClick={handleDelete}>Confirm Delete</button>
      </div>
    </div>
  );
}

export default DeleteBizButton;
