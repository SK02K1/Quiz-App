import { createContext, useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('quizzz-user'))
  );

  const navigate = useNavigate();

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

  useEffect(() => {
    localStorage.setItem('quizzz-user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
