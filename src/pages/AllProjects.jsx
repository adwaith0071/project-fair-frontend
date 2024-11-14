import React, {useState, useEffect } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi, searchProjectApi } from '../services/allApi'

function AllProjects() {

  const [data, setData] = useState([])

  const [key,setKey]=useState("")

  useEffect(() => {
    getData()
  }, [key])

  const getData = async () => {
    const res = await searchProjectApi(key)
    if (res.status == 200) {
      setData(res.data)
    }
  }
  return (
    <>
      <Header />
      <div className='container-fluid p-3'>
        <div className='d-flex justify-content-between '>
        <h3>All Project</h3>

          <input type="text" onChange={(e)=>setKey(e.target.value)} placeholder='Search with Languages...' style={{height:'60px'}} className='form-control w-50'/>

        </div>
        <div className='d-flex flex-wrap justify-content-around mt-4'>
          {
            data.length>0?
            <>
            {
              data.map(item=>(
                <ProjectCard project={item} />
              ))
            }
            
            </>
            :
            <h2>No Projects Available</h2>
          }
         

        </div>

      </div>

    </>)
}

export default AllProjects