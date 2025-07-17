import React, { useContext } from 'react'
import { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export const SellerContext = createContext()


const SellerProvider = ({ children }) => {
    const [sellerCredentials,setSellerCredentials] = useState({
     name:'hashir',
     email:'hashir@gmail.com',
     category:'kitchen',
     inventory:'40',
     price:'40',
     image:''
    })
    const navigate = useNavigate()
    const [sellerLoginPicture, setsellerLoginPicture] = useState(
        localStorage.getItem('sellerLoginPicture' || null)
    )
    const [sellerLoginStatus, setsellerLoginStatus] = useState(
        localStorage.getItem('sellerLoginStatus' || false)
    )

    // user credentials
     const [userCredentials, setUserCredentials] = useState({
            name: '',
            email: '',
            password: ''
        })
    
    

  

    const baseUrl = "http://localhost:5000"

    //login seller

    const handleLoginUser = async () => {
        const loginUser = await fetch(`${baseUrl}/seller/seller-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email: userCredentials.email, password: userCredentials.password })
        })
        if (loginUser.ok) {
            const result = await loginUser.json()
            console.log(result)
            toast.success(result.success)
            setTimeout(() => {
                navigate('/startselling')
            }, 2000);
            setUserCredentials({
                email: '',
                password: ''
            })
            console.log(loginUser.data)



            //store the status of logged in user in local storage 
            setsellerLoginStatus(true)
            localStorage.setItem('sellerLoginStatus', true)
        }

        else if (loginUser.status === 400) {
            const result = await loginUser.json()
            toast.error(result.error)
        }
    }

    // signup seller

    const handleSignUpUser = async () => {
        const signupUser = await fetch(`${baseUrl}/seller/seller-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name: userCredentials.name, email: userCredentials.email, password: userCredentials.password })
        })
        if (signupUser.ok) {
            const result = await signupUser.json()
            console.log(signupUser)
            setTimeout(() => {
                navigate('/sellerlogin')
            }, 2000);
            console.log(result)
            toast.success(result.success)
            setUserCredentials({
                name: '',
                email: '',
                password: ''
            })
        }
        else if (signupUser.status === 400) {
            const result = await signupUser.json()
            toast.error(result.error)
        }
    }

    // login with google 

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google user info: ", decoded);

            // Send token to backend
            const res = await fetch("http://localhost:5000/seller/seller-google-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    token: credentialResponse.credential,
                }),
            });

            const data = await res.json();
            console.log(data)

            if (res.ok) {
                console.log(data.user.picture);
                
                setsellerLoginPicture(data.user.picture)
                localStorage.setItem('sellerLoginPicture', data.user.picture)

                //store the status of logged in user in local storage 
                setsellerLoginStatus(true)
                localStorage.setItem('sellerLoginStatus', true)
                navigate("/startselling");
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Google login error: ", error);
        }
    }

    // logout seller 

    const logOutUser = async (req, res) => {
        const response = await fetch('http://localhost:5000/seller/seller-logout', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        })
        if (response.ok) {
             
            const data = await response.json()
            console.log(data)
            toast.success(data.success)
            
            localStorage.removeItem('sellerLoginPicture')
            setsellerLoginPicture(null)
            setsellerLoginStatus(false)
            localStorage.removeItem('sellerLoginStatus')
            
        }
        else{
            toast.error("Something went wrong")
        }
    }

    // seller upload product 

    const sellerProductUpload  = async (formData)=>{
        const response = await fetch('http://localhost:5000/seller/upload-product',{
            "method":"POST",
            body:formData, 
            credentials:"include"
            
        })
        const data = await response.json()
        console.log(data.success)
    }
    return (
        <div>
            <SellerContext.Provider value={{ handleSignUpUser, handleLoginUser, userCredentials, setUserCredentials, handleGoogleLoginSuccess, sellerLoginPicture, logOutUser, sellerLoginStatus,sellerCredentials,setSellerCredentials,sellerProductUpload }}>
                {children}
            </SellerContext.Provider>
        </div>
    )
}

export default SellerProvider