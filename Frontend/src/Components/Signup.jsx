import React from 'react'
import { useContext,useState } from 'react'
import { AuthenticationContext } from './ContextApi/AuthenticationProvider'
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import  { Toaster } from 'react-hot-toast';


const Signup = () => {
    const [check,setCheck] = useState(true)

    const handleCheck = ()=>{
        setCheck(!check)
    }
    const navigate = useNavigate()

    const backToHome = () => {
        navigate('/')
    }

    const signUpVisibility = (e) => {
        if (e.target.id === 'signup') {
            navigate('/')
        }

    }
    const { handleSignUpUser, userCredentials, setUserCredentials } = useContext(AuthenticationContext)

    const handleInputChange = (e)=>{
       const {name,value} = e.target
       setUserCredentials((prevCredentials)=>({
        ...prevCredentials,
        [name]:value

       }))
    }



    const onSignup = (e) => {
        e.preventDefault()
        handleSignUpUser()

    }
    return (
        <div>
            <div className='h-screen flex items-center justify-center bg-gradient-to-r from-black from-5%  to-sky-900' id='signup' onClick={signUpVisibility}>
                <Toaster/>
                <div className='bg-white w-[500px] p-10 rounded-md flex flex-col space-y-5 '>
                    <div className='flex justify-between '>
                        <h1 className=' text-3xl mb-8'>Sign up</h1>
                        <RxCross1 onClick={backToHome} className='cursor-pointer' />
                    </div>
                    <label>
                        <form onSubmit={onSignup}>
                            <div className='flex flex-col space-y-8'>
                                <input
                                    type="text"
                                    required
                                    className='outline-2 outline-gray-400 focus:outline-blue-500 p-2 rounded-sm '
                                    placeholder='enter your name'
                                    id='name'
                                    name='name'
                                    value={userCredentials.name}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="email"
                                    required
                                    className='outline-2 outline-gray-400 focus:outline-blue-500 p-2 rounded-sm ' placeholder='enter your email'
                                    id='email'
                                    name='email'
                                    value={userCredentials.email}
                                    onChange={handleInputChange}
                                />
                                <div className='relative'>

                                <input type={check ? 'password' : 'text'} className='outline-2 outline-gray-400 focus:outline-blue-500 p-2 rounded-sm  w-full' id='password '
                                    placeholder='enter password'
                                    value={userCredentials.password}
                                    onChange={handleInputChange}
                                    required
                                    name='password'

                                    
                                />
                                {
                                    check ?
                                    (

                                        <IoIosEye
                                        className='absolute top-2 right-2 ' onClick={handleCheck}/>
                                    ):(
                                        <FaEyeSlash className='absolute top-2 right-2 ' onClick={handleCheck}/>
                                    )
                                        
                                     
                                }
                                     
                                    </div>
                            <button type='submit' className='bg-blue-600 flex justify-center rounded-sm p-2 text-white cursor-pointer'>Sign up</button>
                            </div>
                        </form>
                    </label>
                    <div>
                        <p className='text-center'>OR</p>
                    </div>
                    <div className='m-auto'>
                        <p>already have an account?
                        <NavLink className="text-blue-600 p-2 underline" to='/login'>login</NavLink>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Signup