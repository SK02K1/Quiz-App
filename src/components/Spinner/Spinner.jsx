import { ClipLoader } from 'react-spinners';
import { useTheme } from '../../contexts';

const override = `
  display: block;
  margin: 0 auto;
`;

const getSpinnerColor = (theme) => (theme === 'dark' ? '#fafafa' : '#202124');

export const Spinner = () => {
  const { theme } = useTheme();
  return (
    <ClipLoader
      color={getSpinnerColor(theme)}
      size={20}
      speedMultiplier={3}
      css={override}
    />
  );
};
