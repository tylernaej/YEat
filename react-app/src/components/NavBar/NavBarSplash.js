import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessButton from './NavBarComponents/CreateBusinessButton/CreateBusinessButton';
import CreateReviewButton from './NavBarComponents/CreateReviewButton/CreateReviewButton';
import HomeButton from './NavBarComponents/HomeButton/HomeButton';
import SplashProfileButton from './NavBarComponents/SplashProfileButton/SplashProfileButton';
import SearchBar from './NavBarComponents/SearchBar/SearchBar';
import './NavBarSplash.css'

const NavBarSplash = () => {
  return (
    <div id='splash-nav-container'>
      <nav className='flex-row-justify-between' id='splash-nav'>
          <div className='flex-row'>
            <HomeButton />
          </div>
          <div>
            <SearchBar />
          </div>
          <div className='flex-row' id='splash-right-side-buttons'>
            <div>
              <SplashProfileButton />
            </div>
          </div>
      </nav>

    </div>
  );
}

export default NavBarSplash;
