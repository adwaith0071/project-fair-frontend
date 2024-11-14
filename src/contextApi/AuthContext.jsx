import React, { useEffect, useState } from 'react'
import { createContext } from 'react'


export const logContext = createContext()

function AuthContext({ children }) {
    const [logstatus, setLogStatus] = useState(false)

    


    useEffect(()=>{
        checkLogStatus()
    },[])

    const checkLogStatus=()=>{
        if(sessionStorage.getItem('token')){
            setLogStatus(true)
        }
        else{
            setLogStatus(false)
        }
    }
    return (
        <>
            <logContext.Provider value={{ logstatus, setLogStatus }}>
                {children}
            </logContext.Provider>



        </>
    )
}

export default AuthContext