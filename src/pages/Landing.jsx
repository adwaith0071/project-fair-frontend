import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'
function Landing() {
  const [logstatus, setLogstatus] = useState(false)

  // to view all project 

  const [data, setData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLogstatus(true)
    }
    else {
      setLogstatus(false)
    }
    getdata()
  }, [])
         
    const getdata=async()=>{
      const res=await allProjectApi()
      if(res.status==200){
        setData(res.data)
      }
    }
    console.log(data)


  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center ' style={{ height: '90vh' }}>
        <Row>
          <Col className='d-flex  flex-column justify-content-center'>

            <h2>Project Fair</h2>
            <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis unde voluptatem commodi delectus quasi
              dolorem labore neque ullam, temporibus aliquam et rem hic! Consequuntur saepe nobis ullam, eaque cum commodi!</p>
            <div className='d-grid'>
              {
                logstatus ?
                  <Link to='/dash' className='btn btn-info'>Go to Dashboard</Link>
                  :
                  <Link to={'/auth'} className='btn btn-info mt-3 p-3'>Start to Explore</Link>

              }


            </div>
          </Col>
          <Col>
            <img src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png"
              alt="" className='img-fluid' />

          </Col>
        </Row>
      </div>

      <h2 className='text-center mb-4 mt-4'>Project Details</h2>
      {
        data.length>0?
        <div className='d-flex justify-content-around mb-4'>
          {
            data.slice(0,3).map(item=>(
              <ProjectCard  project={item}/>

            ))
          }
       
      </div>
      :
      <h2 className='text-center text-danger my-3'>No Projects Available</h2>
      }
   
      <Link to={'projects'}>
        <h3 className='text-center'>View More</h3>

      </Link>







    </>
  )
}

export default Landing