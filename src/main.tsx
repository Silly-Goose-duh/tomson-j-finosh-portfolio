import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/sections.css';
import '@fontsource/anton/index.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource-variable/inter';
import 'lenis/dist/lenis.css';

const root = document.getElementById('root');

if (root) {
  if (root.hasChildNodes()) hydrateRoot(root, <React.StrictMode><App /></React.StrictMode>);
  else createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
}
