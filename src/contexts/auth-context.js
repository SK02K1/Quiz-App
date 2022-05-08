import { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('quizzz-user'))
  );

  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const signup = async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      toast.success('Successfully signed up');
      setUser(auth.currentUser);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in');
      setUser(res.user);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      toast.success('Successfully logged in');
      setUser(res.user);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    const logoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        navigate(-1);
        resolve('Successfully logged out');
      }, 1200);
    });
    toast.promise(logoutPromise, {
      loading: 'Logging out',
      success: (msg) => msg,
      error: 'Failed in logging out',
    });
  };

  useEffect(() => {
    localStorage.setItem('quizzz-user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, signup, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
