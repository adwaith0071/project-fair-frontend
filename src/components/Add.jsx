import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addprojectApi } from '../services/allApi';
import { responseContext } from '../contextApi/ContextProvider';

function Add() {


    const {setResponse}=useContext(responseContext)
   
   

    const [show, setShow] = useState(false);

    const [project,setProject]=useState({
     image:"", Title:"",Description:"",Language:"",Github:"",Demo:""
    })

    const [preview,setPreview]=useState("")

    useEffect(()=>{
      if(project.image){
        setPreview(URL.createObjectURL(project.image))
      }
      else{
        setPreview("")
      }

    },[project.image])

    const handleAddProject=async()=>{
      // console.log(project)
      const{Title,Description,image,Language,Github,Demo,userId}=project
      if(!Title || !Description ||  !image || !Language || !Github || !Demo){
        toast.warning("Enter Valid Input")
      }
      else{
        const fd=new FormData()
        fd.append("Title",Title)
        fd.append("Description",Description)
        fd.append("image",image)
        fd.append("Language",Language)
        fd.append("Github",Github)
        fd.append("Demo",Demo)

        const header={
          "Content-Type":"multipart/form-data",
          "Authorization":`Token ${sessionStorage.getItem('token')}`
        }
        const res=await addprojectApi(fd,header)
        console.log(res)
        toast.success("Project Added")
        setResponse(res)
        handleClose()





      }
    }

    const handleClose = () =>{
      setProject({ image:"", Title:"",Description:"",Language:"",Github:"",Demo:""})
       setShow(false);}
    const handleShow = () => setShow(true);


  return (
<>
<Button variant="primary" onClick={handleShow}>
        Add Projects
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col>
              <label>
                <input type="file" className='' onChange={(e)=>{setProject({...project,image:e.target.files[0]})}} style={{display:'none'}}/>
                <img style={{cursor:'pointer'}} src={preview?preview: "https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-upload-cloud-vector-icon-png-image_1027251.jpg"} alt="" className='img-fluid' />
              </label>
              </Col>
              <Col>
              <input type="text" placeholder='Title' onChange={(e)=>{setProject({...project,Title:e.target.value})}} className="form-control mb-2" />
              <input type="text" placeholder='Description' onChange={(e)=>{setProject({...project,Description:e.target.value})}} className="form-control mb-2" />
              <input type="text" placeholder='Language' onChange={(e)=>{setProject({...project,Language:e.target.value})}} className="form-control mb-2" />
              <input type="text" placeholder='Github' onChange={(e)=>{setProject({...project,Github:e.target.value})}} className="form-control mb-2" />
              <input type="text" placeholder='Demo' onChange={(e)=>{setProject({...project,Demo:e.target.value})}} className="form-control mb-2" />


              
              </Col>

            </Row>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>


</>  )
}

export default Add