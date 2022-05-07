import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Signup } from './pages';
import { Navbar } from './components';
import { useTheme } from './contexts';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App app-${theme}`}>
      <Toaster position='top-center' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
