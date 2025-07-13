import React, { useContext } from 'react'
import { createContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AddToCartContext } from './AddToCart/AddToCartProvider';


export const AuthenticationContext = createContext()


const AuthenticationProvider = ({children}) => {
    const navigate = useNavigate()
    const {fetchingAllCartItems} = useContext(AddToCartContext)
    const [userCredentials,setUserCredentials] = useState({
      name:'',
      email:'',
      password:''
})
  
  const baseUrl = "http://localhost:5000"
  
  const handleLoginUser = async ()=>{
     const loginUser = await fetch(`${baseUrl}/auth/login`,{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({email:userCredentials.email,password:userCredentials.password})
     })
     if (loginUser.ok) {
        const result = await loginUser.json()
        toast.success(result.success)
        setTimeout(() => {
            navigate('/')
        }, 2000);
        setUserCredentials({
            email:'',
            password:''
        })
        console.log(loginUser.data)
        fetchingAllCartItems()
     }

     else if (loginUser.status === 400){
       const result  = await loginUser.json()
       toast.error(result.error)
     }
  }

  // signup user
  
  const handleSignUpUser = async ()=>{
     const signupUser = await fetch(`${baseUrl}/auth/signup`,{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({name:userCredentials.name,email:userCredentials.email,password:userCredentials.password})
     })
     if (signupUser.ok) {
         const result = await signupUser.json()
         console.log(signupUser)
         setTimeout(() => {
             navigate('/')
         }, 2000);
         console.log(result)
         toast.success(result.success)
         setUserCredentials({
            name:'',
            email:'',
            password:''
         })
     }
     else if (signupUser.status === 400){
         const result = await signupUser.json()
        toast.error(result.error)
         }
  }
  return (
    <div>
        <AuthenticationContext.Provider value={{handleSignUpUser,handleLoginUser,userCredentials,setUserCredentials}}>
            {children}
        </AuthenticationContext.Provider>
    </div>
  )
}

export default AuthenticationProvider