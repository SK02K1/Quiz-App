import './ProfileCard.css';

export const ProfileCard = ({ userData }) => {
  const { displayName, email } = userData;
  return (
    <div className='profile-card'>
      <img
        className='avatar  m-xs-lr'
        src={userData?.photoURL || `/assets/avatar.svg`}
        alt='avatar'
      />
      <div className='m-xs-lr'>
        <h2 className='text-xl m-xs-tb'>{displayName}</h2>
        <p className='m-xs-tb'>{email}</p>
        <button className='btn btn-danger m-xs-tb'>Logout</button>
      </div>
    </div>
  );
};
