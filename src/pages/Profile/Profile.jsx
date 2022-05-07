import { ProfileCard } from '../../components';
import { useAuth } from '../../contexts';

export const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <ProfileCard userData={user} />
    </div>
  );
};
