import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CONFIG } from './config'

document.title = `${CONFIG.name} — ${CONFIG.role}`
const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) metaDesc.setAttribute('content', `${CONFIG.name} — ${CONFIG.role}. ${CONFIG.tagline}`)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
