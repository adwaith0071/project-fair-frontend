import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { updateProjectApi } from '../services/allApi';
import { responseContext } from '../contextApi/ContextProvider';
import { toast } from 'react-toastify';

function Edit({project}) {

  const [data,setData]=useState({
    image:"", Title:"",Description:"",Language:"",Github:"",Demo:""
  })

  useEffect(()=>{
    setData({...project})
  },[])

  // update operation


  const [preview,setPreview]=useState("")

  useEffect(()=>{
    if(data.image.type){
        setPreview(URL.createObjectURL(data.image))
    }
    else{
        setPreview("")
    }
},[data.image])



  const handleUpdateProject=async()=>{
    const{Title,Description,image,Language,Github,Demo}=data
    if(!Title || !Description ||  !image || !Language || !Github || !Demo){
      toast.warning("Invalid Inputs")
    }
    else{
      if(data.image.type){
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

      const res=await updateProjectApi(project._id,header,fd)
      if(res.status==200){
        toast.success("Project Updated")
        setResponse(res)
        handleClose()
      }
      else{
        toast.error("Failed to Update Project")
      }
        
      }
      else{
        const header={
          "Content-Type":"application/json",
          "Authorization":`Token ${sessionStorage.getItem('token')}`
      }
   
      const res=await updateProjectApi(project._id,header,data)
      if(res.status==200){
        toast.success("Project Updated")
        setResponse(res)
        handleClose()
      }
      else{
        toast.error("Failed to Update")
      }
        

      }
    }
  }

  // usecontext purpose
  const {setResponse}=useContext(responseContext)















    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button  onClick={handleShow} >
    <i className="fa-solid fa-pen-to-square fa-xl" />
          </Button>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                  <Col>
                  <label>
                    <input type="file" className='' onChange={(e)=>setData({...data,image:e.target.files[0]})} style={{display:'none'}}/>
                    <img src={ preview?preview: `${base_url}/uploads/${data.image}`}  alt="" className='img-fluid' />
                  </label>
                  </Col>
                  <Col>
                  <input type="text" onChange={(e)=>setData({...data,Title:e.target.value})} defaultValue={data.Title} placeholder='Title' className="form-control mb-2" />
                  <input type="text" onChange={(e)=>setData({...data,Description:e.target.value})} defaultValue={data.Description} placeholder='Description' className="form-control mb-2" />
                  <input type="text" onChange={(e)=>setData({...data,Language:e.target.value})} defaultValue={data.Language} placeholder='Language Used' className="form-control mb-2" />
                  <input type="text" onChange={(e)=>setData({...data,Github:e.target.value})} defaultValue={data.Github} placeholder='Git Repository' className="form-control mb-2" />
                  <input type="text" onChange={(e)=>setData({...data,Demo:e.target.value})} defaultValue={data.Demo} placeholder='Demo Link' className="form-control mb-2" />
    
    
                  
                  </Col>
    
                </Row>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateProject}>Update</Button>
            </Modal.Footer>
          </Modal>
    
    
    </> 
  )
}

export default Edit