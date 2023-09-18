import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/common/App/App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <CurrentUserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </CurrentUserProvider>
);
