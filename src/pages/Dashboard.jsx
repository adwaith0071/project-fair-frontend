import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Header from '../components/Header'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { deleteProjectApi, getProjectApi } from '../services/allApi'
import { responseContext } from '../contextApi/ContextProvider'
import Profile from './Profile'

function Dashboard() {


  const [uname, setUname] = useState("")
  const{response}=useContext(responseContext)




  

    // to display all the project

    const [project, setProject] = useState([])

    const getData = async () => {
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }

      const res = await getProjectApi(header)
      setProject(res.data)
    }
 

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUname(sessionStorage.getItem("user"))
    }
    getData()
  }, [response])

  // delete operarion
const handleDelete=async(id)=>{
  const header={
    "Content-Type":"application/json",
    "Authorization":`Token ${sessionStorage.getItem('token')}`
  }
  const res=await deleteProjectApi(id,header)
  if(res.status==200){
    getData()
  }
  else{
    toast.error("Delete Failed")
  }
}
  
  return (
    <>
      <Header />

      <div className='container-fluid p-3'>
        <h1 className='text-center my-3'>Welcome ,<span className='text-info'>{uname}</span></h1>
        <Row>
          <Col md={8} sm={12}>
            <h3>Projects</h3>
            <div className=' bg-light shadow p-2'>
              <Add />
              <div className='my-2'>
                {
                  project?.length?
                  project.map(item=>(
                    <div className='border p-4 border-2 border-info shadow mb-3 d-flex justify-content-between'>
                    <h4>{item.Title}</h4>
                    <div className='d-flex justify-content-between'>
                      <a href={item.Github} className='me-2'><i className="fa-brands fa-2xl fa-github" /></a>
                      <Edit project={item} />
                      <button className='btn' onClick={()=>handleDelete(item._id)}><i className="fa-solid fa-trash fa-xl" style={{ color: "#da1010", }} /></button>
                    </div>
  
                  </div>
                  ))
                  :
                  <h3>No projects</h3>
                }
              

              </div>
            </div>

          </Col>
          <Col md={4} sm={12}>
           <Profile/>

          </Col>


        </Row>

      </div>


    </>)
}

export default Dashboard