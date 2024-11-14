import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import base_url from '../services/base_url'
import { toast } from 'react-toastify'
import { updateProfileApi } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextApi/AuthContext'

function Profile() {
        // authcontext operation for restricting back to pages 

        const {setLogStatus}=useContext(logContext)

    const [view, setView] = useState(false)

    const changeView = () => {
        setView(!view)
    }


    const [details, setDetails] = useState({
        username: "", profile: "", github: "", linkedin: ""
    })

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setDetails({ username:sessionStorage.getItem('user'), github: sessionStorage.getItem('github'), linkedin: sessionStorage.getItem('linkedin'), profile: sessionStorage.getItem('profile') })
        }
    }, [])

    const nav=useNavigate()


    const handleUpdate = async () => {
        console.log(details)
        const { username, github, linkedin, profile } = details
        if (!username || !github || !linkedin || !profile) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            if (details.profile?.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('profile', profile)
                fd.append('github', github)
                fd.append('linkedin', linkedin)

                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const res=await updateProfileApi(header,fd)
                if(res.status==200){
                    toast.success("Profile Updated Successfully!!")
                    nav('/auth')
                    setLogStatus(false)
                    sessionStorage.clear()

                
                }
                else{
                    toast.error("Error Occured!!")
                }

            }
            else{
                const header={
                    "Content-Type": "application/json",
                    "Authorization":`Token ${sessionStorage.getItem('token')}`

                }
                const result=await updateProfileApi(header,details)
                if(result.status==200){
                    toast.success("Profile Updated Successfully!!")
                    nav('/auth')
                    setLogStatus(false)

                    sessionStorage.clear()

                   
                }
                else{
                    toast.error("Error Occured!!")
                }
            }
        }
    }

    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (details.profile.type) {
            setPreview(URL.createObjectURL(details.profile))
        }
        else {
            setPreview("")
        }
    }
        , [details.profile])


      



    return (
        <>
            <div className='w-100 p-2 shadow mt-3 '>
                <div className='d-flex justify-content-between'>
                    <h3 style={{ fontWeight: 'bolder' }}>Profile Updation</h3>
                    <button className='btn' onClick={changeView}>
                        {
                            view ?
                                <i className="fa-solid fa-chevron-up fa-lg" /> :
                                <i className="fa-solid fa-chevron-down fa-lg" />

                        }
                    </button>

                </div>
                {
                    view &&
                    <div>
                        <label>
                            <input type="file" onChange={(e) => setDetails({ ...details, profile: e.target.files[0] })} style={{ display: 'none' }} />
                            <img src={preview ? preview : details.profile !== '' ? `${base_url}/uploads/${details.profile}` : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-male-icon.png"} alt="profile" className='img-fluid' />
                        </label>
                        <input type="text" onChange={(e) => setDetails({ ...details, username: e.target.value })} defaultValue={details.username} placeholder='Username' className="form-control mb-3 mt-3" />
                        <input type="text" onChange={(e) => setDetails({ ...details, github: e.target.value })} defaultValue={details.github} placeholder='GitHub Link' className="form-control mb-3" />
                        <input type="text" onChange={(e) => setDetails({ ...details, linkedin: e.target.value })} defaultValue={details.linkedin} placeholder='Linkedin Link' className="form-control mb-3" />
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={handleUpdate}>Update</button>
                            <button className='btn btn-danger'onClick={changeView}>Cancel</button>

                        </div>

                    </div>
                }

            </div>
        </>)
}

export default Profile