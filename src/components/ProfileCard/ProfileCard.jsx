import './ProfileCard.css';
import { useAuth } from '../../contexts';

export const ProfileCard = () => {
  const { user, logout } = useAuth();
  const { displayName, email } = user;
  return (
    <div className='profile-card'>
      <img
        className='avatar  m-xs-lr'
        src={user?.photoURL || `/assets/avatar.svg`}
        alt='avatar'
      />
      <div className='m-xs-lr'>
        <h2 className='text-xl m-xs-tb'>{displayName}</h2>
        <p className='m-xs-tb'>{email}</p>
        <button onClick={logout} className='btn btn-danger m-xs-tb'>
          Logout
        </button>
      </div>
    </div>
  );
};
