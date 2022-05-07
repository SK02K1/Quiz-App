import { ProfileCard } from '../../components';
import { useDocumentTitle } from '../../hooks';

export const Profile = () => {
  useDocumentTitle('Profile');
  return (
    <div>
      <ProfileCard />
    </div>
  );
};
