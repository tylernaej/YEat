import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, profilePicture, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateProfilePicture = (e) => {
    setProfilePicture(e.target.value);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="full-signup-page">
      <div id="sign-up-header">
        <h3>Sign Up for YEat</h3>
      </div>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="firstName-lastName">
          <div className="firstName-lastName-input">
            {/* <label>First Name</label> */}
            <input
              placeholder="First Name"
              type="text"
              name="first name"
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div className="firstName-lastName-input">
            {/* <label>Last Name</label> */}
            <input
              placeholder="Last Name"
              type="text"
              name="username"
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
        </div>
        <div>
          {/* <label>User Name</label> */}
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            placeholder="Repeat Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          {/* <label>Profile Picture</label> */}
          <input
            placeholder="Profile Picture (optional)"
            type="text"
            name="profile picture"
            onChange={updateProfilePicture}
            value={profilePicture}
          ></input>
        </div>
        <div className="sign-up-submit">
          <button type="submit">Sign Up</button>
        </div>
        <div className="have-an-account">
          <div>
            <span className="have-an-account-words">Already on YEat?</span>
            <NavLink className="have-an-account-link" to={"/login"}>
              Log In
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
