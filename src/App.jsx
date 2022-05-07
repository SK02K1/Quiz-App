import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Signup } from './pages';
import { Navbar } from './components';
import { useTheme } from './contexts';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App app-${theme}`}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
