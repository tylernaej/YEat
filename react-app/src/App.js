import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import BizList from './components/Business/BusinessList';
import BizPage from './components/Business/BusinessPage';
import BizForm from './components/Business/CreateBusinessForm';
import BizSearchList from './components/Business/BusinessList/searchIndex';
import ReviewForm from './components/Reviews/CreateReviewForm';
import { authenticate } from './store/session';
import UpdateBizForm from './components/Business/UpdateBusinessForm';
import BizReviewSearch from './components/Reviews/BizReviewSearch';
import UserBizList from './components/Business/UserBusinesses/UserBizList';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <div className='h100 w100'>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/myBusinesses">
          <UserBizList />
        </ProtectedRoute>
        <ProtectedRoute path="/create-business">
          <BizForm />
        </ProtectedRoute>
        <ProtectedRoute path="/businesses/:businessId/create-review">
          <ReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path="/businesses/reviews/search">
          <BizReviewSearch />
        </ProtectedRoute>
        <Route path="/businesses/search">
          <BizSearchList />
        </Route>
        <Route path="/businesses/:businessId">
          <BizPage />
        </Route>
        <Route path="/businesses">
          <BizList />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
