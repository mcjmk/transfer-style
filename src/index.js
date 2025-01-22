import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
