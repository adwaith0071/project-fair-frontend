import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';

function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (

    <>

<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" onClick={handleShow} style={{cursor:'pointer', height:'200px'}} src={`${base_url}/uploads/${project.image}`} />
      <Card.Body>
        <Card.Title>{project.Title}</Card.Title>
       
      </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Row>
          <Col>
          <img src={`${base_url}/uploads/${project.image}`} style={{objectFit:'cover',cursor:'pointer'}} alt="" className='img-fluid' />
          
          </Col>
          <Col>
          <h4>{project.Title}</h4>
          <h6><span className='text-info'>Description :{project.Description} </span> </h6>
          <h6><span>Languages : </span>{project.Language}</h6>
          <div className='mt-3 d-flex justify-content-between'>
            <a href="">
            <i className="fa-solid fa-link fa-xl" />
            </a>
            <a href={project.Github}>
            <i  className="fa-brands fa-github fa-xl"  />
            </a>

          </div>
          </Col>

        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    
    
    </>

)
}

export default ProjectCard