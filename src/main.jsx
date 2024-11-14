import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './contextApi/ContextProvider.jsx'
import AuthContext from './contextApi/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<ContextProvider>
  <AuthContext>
<App />
</AuthContext>
</ContextProvider>
  
    </BrowserRouter>
  </StrictMode>,
)
