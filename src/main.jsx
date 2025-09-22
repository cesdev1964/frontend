import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<App />);
