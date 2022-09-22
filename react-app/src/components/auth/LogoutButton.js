import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <>
      
      <div onClick={onLogout}>
      <i className="fa-solid fa-arrow-right-from-bracket" id='bottom-icon'></i>
        Logout
      </div>
    </>
  )
};

export default LogoutButton;
