import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme-context';
import { CategoriesProvider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
