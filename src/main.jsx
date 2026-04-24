import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles/index.css";
import "./styles/templatemo_style.css"
import { AuthProvider } from './context/auth/auth_context.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
