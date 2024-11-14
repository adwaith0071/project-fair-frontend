import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextApi/AuthContext';

function Header() {

    // authcontext operation for restricting back to pages 
    const { setLogStatus } = useContext(logContext)

  const nav = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear()
    setLogStatus(false)

    nav('/auth')
  }





  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <i className="fa-solid fa-diagram-project fa-xl" style={{ color: "#B197FC", }} />
            {' '}
            Project Fair
          </Navbar.Brand>
          <button className='btn btn-danger p-2' onClick={handleLogout}>Signout</button>
        </Container>
      </Navbar>

    </>)
}

export default Header