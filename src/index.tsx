import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/common/App/App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ErrorPopupProvider } from './contexts/ErrorPopupContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ErrorPopupProvider>
    <CurrentUserProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </CurrentUserProvider>
  </ErrorPopupProvider>
);
