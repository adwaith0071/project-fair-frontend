import React, { useContext } from 'react'
import { Row,Col } from 'react-bootstrap'
import { useState } from 'react'
import { loginApi, registerApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextApi/AuthContext'

function Auth() {

    // authcontext operation for restricting back to pages 

    const {setLogStatus}=useContext(logContext)



  const [authstatus,setAuthstatus]=useState(false)
  
  const nav =useNavigate()

  const[user,setUser]=useState({
    email:'',username:'',password:''
  })


  const handleRequest=async()=>{

    const{email,username,password}=user
    if(!email || !username || !password){
      toast.warning("Enter Valid Input")
    }
    else{
      const res=await registerApi(user)
      if(res.status==200){
        toast.success("Registration Successfull")
        changeStatus()
        setUser({
          email:"",username:"",password:""
        })

      }
      else{
        toast.error("Registration Failed!!")
      }
    }
  }

  // for login
  const handleLogin=async()=>{
    const{email,password}=user
    if(!email || !password){
      toast.warning("Login Failed")
    }
    else{
      const res=await loginApi(user)
      console.log(res)
      if(res.status==200){
        toast.success("Login Successfull")
        setUser({
          email:"",password:""
        })
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.username)
        sessionStorage.setItem('profile',res.data.profile)
        sessionStorage.setItem('github',res.data.github)
        sessionStorage.setItem('linkedin',res.data.linkedin)
        setLogStatus(true)

        nav('/')
      }
      else{
        toast.error("Login Failed")
      }
    }
  }



  const changeStatus=()=>{
    setAuthstatus(!authstatus)
  }






  return (
<>
<div className='container-fluid d-flex w-100 justify-content-center align-items-center' style={{height:'100vh'}}>
  <div className='w-75 border shadow border-2 p-3'>
    <Row>
      <Col>
      <img src="https://cdn.prod.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298b303b93d91_3d-tb-education.png" className='img-fluid' alt="" />
      
      </Col>
      <Col className='d-flex flex-column justify-content-center'>
      <h3 style={{fontSize:'30px', fontWeight:'bold'}}>
       {
        authstatus?
        <>Registration</>:
        <>Login</>
       }

      </h3>

     <div>
     <input type="email" onChange={(e)=>{setUser({...user,email:e.target.value})}} value={user.email} placeholder='Enter Email ID' className="form-control my-3" />
     {
      authstatus&&
      <input type="text" placeholder='Enter Username' onChange={(e)=>{setUser({...user,username:e.target.value})}} value={user.username} className="form-control my-3" />

     }

      <input type="password" placeholder='Enter Password' onChange={(e)=>{setUser({...user,password:e.target.value})}} value={user.password} className="form-control my-3" />

     </div>
     <div className='d-flex justify-content-between'>
      {
        authstatus?
        <button className='btn btn-info mb-3' onClick={handleRequest}>Registration</button>:
        <button className='btn btn-success mb-3' onClick={handleLogin}>Login</button>


      }
      <button className="btn btn-link" onClick={changeStatus}>
       {
        authstatus?
        <>Already A User?</>:
        <>New User?</>
       }

      </button>

     </div>

      
      </Col>
    </Row>

  </div>

</div>


</>  )
}

export default Auth