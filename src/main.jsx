import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../public/assets/css/style.css'
import '../public/assets/css/bootstrap-custom.min.css';
import '../public/assets/icons-1.13.1/font/bootstrap-icons.min.css';
import '../public/assets/css/bootstrap-custom.min.css';
import '../public/assets/js/script';
import '../public/assets/js/bootstrap.bundle.min.js';
import '../cc-init.js';
import * as bootstrap from 'bootstrap';  
window.bootstrap = bootstrap;    

document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<App />);
