import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'; // Make sure this path is correct
<keyword>Self Storage, Makhzny, مخزني, خزن معنا , مخرن , مخازن , المخازن الذاتية ,  تخزين ,  thebox , the box</keyword>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
