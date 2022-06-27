import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div style={{ maxWidth: 450}}>
      <App />
    </div>
  </React.StrictMode>
);

