
// import { Modal } from "../../context/Modal";
import React, { useEffect, useState } from "react";
import { deleteBizThunk } from "../../../../store/business";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './DeleteBusinessButton.css'

function DeleteBizButton({business, setIsLoaded, setValidationErrors, setShowModal}) {


//   const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
       e.preventDefault();
       setIsLoaded(false);
       const data = await dispatch(deleteBizThunk(business.id));
       if (data.statusCode > 200) {
          console.log('have error')
         setValidationErrors([data.message]);
         return
       }
      //  console.log('success')
       history.push(`/businesses`);
     };

  const handleClick = e => {
    e.preventDefault()
    setShowModal(false);
  }


  return (
    <div className="whole-modal">
      {/* <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )} */}
      <div className="header-modal">
        <h3>Are you sure you want to remove {business.name}?</h3>
      </div>
      <div className="confirm-delete">
        <button className='cancel-button' onClick={handleClick}>Cancel</button>
        <button className='confirm-button' onClick={handleDelete}>Confirm Delete</button>
      </div>
    </div>
  );
}

export default DeleteBizButton;
