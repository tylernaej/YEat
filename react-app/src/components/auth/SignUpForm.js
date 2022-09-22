import React, { useEffect, useState } from 'react';
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

  const [isSubmitted, setIsSubmitted] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = []

    if(password !== repeatPassword) validationErrors.push('Passwords are not the same')
    // console.log(profilePicture && !/.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(profilePicture.split("?")[0]) && profilePicture.length !== 0)
    
    if (!/.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(profilePicture.split("?")[0]) && profilePicture.length !== 0) {
      validationErrors.push("Please submit a valid preview image");
    }

    setErrors(validationErrors)
  }, [password, repeatPassword, profilePicture])

  const onSignUp = async (e) => {
    e.preventDefault();

    setIsSubmitted(true)

    if (errors.length > 0) return

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
          {isSubmitted && errors.map((error, ind) => (
            <div className='error' key={ind}><li>{error}</li></div>
          ))}
        </div>
        <div className="firstName-lastName">
          <div className="firstName-lastName-input">
            {/* <label>First Name</label> */}
            <input
              required
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
              required
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
            required
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
            required
            placeholder="Email"
            type="email"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            required
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
