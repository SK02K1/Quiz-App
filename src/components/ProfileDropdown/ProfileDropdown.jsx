import './ProfileDropdown.css';
import { useState } from 'react';
import { useAuth } from '../../contexts/';

export const ProfileDropdown = () => {
  const [isProfileMenuActive, setIsProfileMenuActive] = useState(false);
  const { user } = useAuth();

  const toggleProfileMenu = () => {
    setIsProfileMenuActive((profileMenuPrevState) => !profileMenuPrevState);
  };

  return (
    <div className='profile-dropdown avoid-text-highlight'>
      <span
        onClick={toggleProfileMenu}
        className='material-symbols-rounded icon-profile m-sm-l'
      >
        account_circle
      </span>
      {isProfileMenuActive && (
        <ul className='list profile-menu'>
          {user ? (
            <>
              <li className='list-item profile-menu-control'>Dashboard</li>
              <li className='list-item profile-menu-control'>Logout</li>
            </>
          ) : (
            <>
              <li className='list-item profile-menu-control'>
                Create new account
              </li>
              <li className='list-item profile-menu-control'>Login</li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
