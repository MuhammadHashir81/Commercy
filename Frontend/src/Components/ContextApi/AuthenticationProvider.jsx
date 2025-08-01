import React, { useContext } from 'react'
import { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AddToCartContext } from './AddToCart/AddToCartProvider';

import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export const AuthenticationContext = createContext()


const AuthenticationProvider = ({ children }) => {
    const navigate = useNavigate()
    const [loginPicture, setLoginPicture] = useState(
        localStorage.getItem('loginPicture' || null)
    )
    const [isLoginUser, setIsLoginUser] = useState(
        localStorage.getItem('isLoginUser' || false)
    )
    

    const { fetchingAllCartItems } = useContext(AddToCartContext)
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const baseUrl = "http://localhost:5000"

    const handleLoginUser = async () => {
        const loginUser = await fetch(`${baseUrl}/auth/login`, {
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
                navigate('/')
            }, 2000);
            setUserCredentials({
                email: '',
                password: ''
            })
            console.log(loginUser.data)
            fetchingAllCartItems()


            //store the status of logged in user in local storage 
            setIsLoginUser(true)
            localStorage.setItem('isLoginUser', true)
        }

        else if (loginUser.status === 400) {
            const result = await loginUser.json()
            toast.error(result.error)
        }
    }

    // signup user

    const handleSignUpUser = async () => {
        const signupUser = await fetch(`${baseUrl}/auth/signup`, {
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
                navigate('/login')
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
            const res = await fetch("http://localhost:5000/auth/google-login", {
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
                fetchingAllCartItems()
                setLoginPicture(data.user.picture)
                localStorage.setItem('loginPicture', data.user.picture)

                //store the status of logged in user in local storage 
                setIsLoginUser(true)
                localStorage.setItem('isLoginUser', true)
                navigate("/");
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Google login error: ", error);
        }
    }

    // logout user 

    const logOutUser = async (req, res) => {
        const response = await fetch('http://localhost:5000/auth/logout', {

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
            
            localStorage.removeItem('loginPicture')
            setLoginPicture(null)
            setIsLoginUser(false)
            localStorage.removeItem('isLoginUser')
            fetchingAllCartItems()
        }
        else{
            toast.error("Something went wrong")
        }
    }
    return (
        <div>
            <AuthenticationContext.Provider value={{ handleSignUpUser, handleLoginUser, userCredentials, setUserCredentials, handleGoogleLoginSuccess, loginPicture, logOutUser, isLoginUser }}>
                {children}
            </AuthenticationContext.Provider>
        </div>
    )
}

export default AuthenticationProvider