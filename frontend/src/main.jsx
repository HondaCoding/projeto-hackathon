import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './global.css'
import App from './App.jsx'
import logo from './assets/react.svg'
import Footer from './components/Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container-centralizada">
      <img src={logo} alt="Logo" className="app-logo" />
      <App />
    </div>
      
  </StrictMode>,
)
