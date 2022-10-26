import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessButton from './NavBarComponents/CreateBusinessButton/CreateBusinessButton';
import CreateReviewButton from './NavBarComponents/CreateReviewButton/CreateReviewButton';
import HomeButton from './NavBarComponents/HomeButton/HomeButton';
import ProfileButton from './NavBarComponents/ProfileButton/ProfileButton';
import SearchBar from './NavBarComponents/SearchBar/SearchBar';
import './NavBarNoSearch.css'

const NavBarNoSearch = () => {
  return (
    <div id='no-search-nav-container'>
      <nav className='flex-row-justify-between' id='no-search-nav'>
          <div className='flex-row'>
            <HomeButton />
          </div>
          <div className='flex-row' id='no-search-right-side-buttons'>
            <div id='see-all-businesses'>
              <NavLink to={'/businesses'} id='see-all-businesses-navlink'>All Businesses</NavLink>
            </div>
            <div>
              <CreateBusinessButton />
            </div>
            <div>
              <CreateReviewButton />
            </div>
            <div id='see-all-businesses'>
              <NavLink to='/about'  id='see-all-businesses-navlink' >Meet the Devs</NavLink>
            </div>
            <div>
              <ProfileButton />
            </div>
          </div>
      </nav>

    </div>
  );
}

export default NavBarNoSearch;
