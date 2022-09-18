
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessButton from './NavBarComponents/CreateBusinessButton/CreateBusinessButton';
import CreateReviewButton from './NavBarComponents/CreateReviewButton/CreateReviewButton';
import HomeButton from './NavBarComponents/HomeButton/HomeButton';
import ProfileButton from './NavBarComponents/ProfileButton/ProfileButton';
import SearchBar from './NavBarComponents/SearchBar/SearchBar';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <HomeButton />
        </li>
        <li>
          <SearchBar />
        </li>
        <li>
          <CreateBusinessButton />
        </li>
        <li>
          <CreateReviewButton />
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
