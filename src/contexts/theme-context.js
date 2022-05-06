import { createContext, useContext, useEffect, useState } from 'react';
import { useSound } from 'use-sound';

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('quizzz-theme') ?? 'light'
  );
  const [switchOn] = useSound('/sfx/switch-on.mp3');
  const [switchOff] = useSound('/sfx/switch-off.mp3');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    theme === 'dark' ? switchOff() : switchOn();
  };

  useEffect(() => {
    localStorage.setItem('quizzz-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
