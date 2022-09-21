import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import NavigationButton from './NavigationButton';
import './Navigation.css';

function Navigation({ isLoaded }){

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div className='nav-container'>
      <div className='nav'>
        <NavLink exact to="/">
          <div id="home-button">
          </div>
        </NavLink>
        <div></div>
        {/* {isLoaded && sessionLinks} */}
        <NavigationButton />
      </div>
    </div>
  );
}

export default Navigation;