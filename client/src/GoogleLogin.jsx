/*global google*/
import React, { useEffect } from 'react'
import useAuth from './auth/Auth'
import { decodeJwt } from './utils/util'



export const GoogleLogin = () => {
    const { signIn } = useAuth();

    const handleCallBackResponse = async (response) => {
        console.log(response.credential, decodeJwt(response.credential))
        signIn(response.credential, null);
    }

    useEffect(() => {
        window?.google?.accounts?.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallBackResponse
        })
        window?.google?.accounts?.id.renderButton(
            document.getElementById("signindiv"),
            { theme: "outline", size: "large" }
        )
    }, [])
    
    return (
        <div id='signindiv'></div>
    )
}
