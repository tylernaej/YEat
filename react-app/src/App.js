import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import './app.css'


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
import UpdateBizForm from './components/Business/UpdateBusinessForm';
import BizReviewSearch from './components/Reviews/BizReviewSearch';
import UserBizList from './components/Business/UserBusinesses/UserBizList';
import SplashPage from './components/Home/SplashPage';
import UpdateReviewForm from './components/Reviews/UpdateReviewForm';
import NavBarSplash from './components/NavBar/NavBarSplash';
import NavBarNoSearch from './components/NavBar/NavBarNoSearch';
import About from './components/About/About';
// import { ModalProvider } from './context/Modal';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(window.location.pathname)

  // console.log('location is:', location)

  useEffect(() => {
    setLocation(window.location.pathname)
  }, [location])

  

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
    // <ModalProvider>
      <BrowserRouter>
      <div className='h100 w100 flex-column'>
        <div id='appjs-switch-wrapper'>
          <Switch>
            <Route path="/login" exact={true}>
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <LoginForm />
            </Route>
            <Route path="/signup" exact={true}>
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <SignUpForm />
            </Route>
            <ProtectedRoute path="/myBusinesses">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <UserBizList />
            </ProtectedRoute>
            <ProtectedRoute path="/writeareview/search">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <BizSearchList />
            </ProtectedRoute>
            <ProtectedRoute path="/create-business">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <BizForm />
            </ProtectedRoute>
            {/* <ProtectedRoute path="/businesses/:businessId/create-review">
              <ReviewForm />
            </ProtectedRoute> */}
            {/* <ProtectedRoute path="/reviews/:reviewId/edit">
              <UpdateReviewForm />
            </ProtectedRoute> */}
            <ProtectedRoute path="/businesses/reviews/search">
              <NavBarNoSearch />
              <div id='navbar-spacer'>
              </div>
              <BizReviewSearch />
            </ProtectedRoute>
            <Route path="/businesses/search">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <BizSearchList />
            </Route>
            <Route path="/businesses/:businessId">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <BizPage />
            </Route>
            <Route path="/businesses">
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <BizList />
            </Route>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <div id='navbar-spacer'>
              </div>
              <User />
            </ProtectedRoute>
            <Route path="/about" exact={true}>
              <NavBar />
              <div id='navbar-spacer'>
              </div>
              <About />
            </Route>
            <Route path="/" exact={true}>
              <NavBarSplash />
              <SplashPage />
            </Route>
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    // </ModalProvider>
  );
}

export default App;
