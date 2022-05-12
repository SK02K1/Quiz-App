import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme-context';
import { AuthProvider, CategoriesProvider, QuizProvider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CategoriesProvider>
          <AuthProvider>
            <QuizProvider>
              <App />
            </QuizProvider>
          </AuthProvider>
        </CategoriesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
