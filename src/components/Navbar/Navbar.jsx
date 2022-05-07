import './Navbar.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link className='text-2xl' to='/'>
          Quizzz
        </Link>
      </div>
      <div className='nav-controls'>
        <span
          aria-label='Toggle app theme'
          title='Toggle app theme'
          onClick={toggleTheme}
          className='btn-theme-toggle material-symbols-rounded'
        >
          {theme === 'dark' ? 'light' : 'dark'}_mode
        </span>
      </div>
    </nav>
  );
};
