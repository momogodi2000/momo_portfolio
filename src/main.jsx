// src/main.jsx - Fixed React 18 Entry Point
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create React root (React 18 syntax)
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render the app with error boundary
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)