import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import { Navbar } from './components';
import { useTheme } from './contexts';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App app-${theme}`}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
