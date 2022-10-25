import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessButton from './NavBarComponents/CreateBusinessButton/CreateBusinessButton';
import CreateReviewButton from './NavBarComponents/CreateReviewButton/CreateReviewButton';
import HomeButton from './NavBarComponents/HomeButton/HomeButton';
import ProfileButton from './NavBarComponents/ProfileButton/ProfileButton';
import SearchBar from './NavBarComponents/SearchBar/SearchBar';
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div id='nav-container'>
      <nav className='flex-row-justify-between' id='nav'>
          <div className='flex-row'>
            <HomeButton />
          </div>
          <div>
            <SearchBar />
          </div>
          <div className='flex-row' id='right-side-buttons'>
            <div id='see-all-businesses'>
              <NavLink to={'/businesses'} id='see-all-businesses-navlink'>All Businesses</NavLink>
            </div>
            {sessionUser && (
              <>
                <div>
                  <CreateBusinessButton />
                </div>
                <div>
                  <CreateReviewButton />
                </div>
              </>
            )}
              <div>
              <ProfileButton />
            </div>
          </div>
      </nav>

    </div>
  );
}

export default NavBar;
