import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Profile,
  Question,
  Result,
  Rules,
  Signup,
  SingleCategory,
} from './pages';
import { Navbar, RequireAuth } from './components';
import { useTheme } from './contexts';
import { Toaster } from 'react-hot-toast';

function App() {
  const { theme } = useTheme();
  return (
    <div className={`App app-${theme}`}>
      <Toaster position='top-center' />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/categories/:categoryName' element={<SingleCategory />} />
        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/rules/:quizID' element={<Rules />} />
          <Route path='/question/:quizID' element={<Question />} />
          <Route path='/results/:resultID' element={<Result />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
