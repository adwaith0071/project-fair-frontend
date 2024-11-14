import { useContext } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AllProjects from './pages/AllProjects' 
import Header from './components/Header'
import Footer from './components/Footer'
import { Route,Routes } from 'react-router-dom'
import './bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextApi/AuthContext'


function App() {
  const {logstatus}=useContext(logContext)

  return (
    <>
    <Routes>
     <Route path="/" element={<Landing />} />
     <Route path="/auth" element={<Auth />} />
     <Route path="/projects" element={logstatus? <AllProjects />:<Auth/>} />
     <Route path="/dash" element={ logstatus?<Dashboard />:<Auth/>} />
   
    </Routes>
    <Footer/>
    <ToastContainer/>
     
    </>
  )
}

export default App
