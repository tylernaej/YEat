
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessButton from './NavBarComponents/CreateBusinessButton/CreateBusinessButton';
import CreateReviewButton from './NavBarComponents/CreateReviewButton/CreateReviewButton';
import HomeButton from './NavBarComponents/HomeButton/HomeButton';
import ProfileButton from './NavBarComponents/ProfileButton/ProfileButton';
import SearchBar from './NavBarComponents/SearchBar/SearchBar';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='flex-row-justify-between' id='nav'>
        <div className='flex-row'>
          <HomeButton />
          <NavLink to={'/businesses'}>See all businesses</NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className='flex-row'>
          <div>
            <CreateBusinessButton />
          </div>
          <div>
            <CreateReviewButton />
          </div>
          <div>
            <ProfileButton />
          </div>
        </div>
    </nav>
  );
}

export default NavBar;
