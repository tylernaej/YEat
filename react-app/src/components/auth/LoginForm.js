import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = async (e) => {
    e.preventDefault()
    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data)
    }
  }

  if (user) {
    return <Redirect to='/businesses' />;
  }

  return (
    <div id="full-login-page">
      <div className="login-to-yeat">
        <h3>Log in to YEat</h3>
      </div>
      <form className="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className='error' key={ind}><li>{error}</li></div>
          ))}
        </div>
        <div id="input-field">
          {/* <label htmlFor="email">Email</label> */}
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div id="input-field">
          {/* <label htmlFor="password">Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <div className="login-buttons">
            <button type="submit">Login</button>
            <button onClick={handleDemo}>Login as Demo User</button>
          </div>
          <div className='new-to-yeat'>
            <div><span className='new-to-yeat-words'>New to yeat?</span><NavLink className='new-to-yeat-link' to={'/signup'}>Sign Up!</NavLink></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
