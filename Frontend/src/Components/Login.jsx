    import { useContext, useState } from 'react'
    import { AuthenticationContext } from './ContextApi/AuthenticationProvider'
    import { RxCross1 } from "react-icons/rx";
    import { NavLink } from 'react-router-dom';
    import { useNavigate } from 'react-router-dom';
    import { Toaster } from 'react-hot-toast';
    import { IoIosEye } from "react-icons/io";
    import { FaEyeSlash } from "react-icons/fa";
    import { TbLockPassword } from "react-icons/tb";
    import { FaRegUser } from "react-icons/fa6";

    import { CiUser } from "react-icons/ci";


    import { GoogleLogin } from '@react-oauth/google';
    
    const Login = () => {
        const { handleLoginUser, userCredentials, setUserCredentials, handleGoogleLoginSuccess } = useContext(AuthenticationContext)

        const [check, setCheck] = useState(true)

        // login with google 

        const handleGoogleLogin = () => {
            handleGoogleLoginSuccess()

        }

        const handleCheck = () => {
            setCheck(!check)
        }

        const onLogin = (e) => {
            e.preventDefault()
            handleLoginUser()
        }


        const handleInputChange = (e) => {
            const { name, value } = e.target
            setUserCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value

            }))
        }


        const navigate = useNavigate()

        const backToHome = () => {
            navigate('/')
        }

        const loginVisibility = (e) => {
            if (e.target.id === 'login') {
                navigate('/')
            }

        }
        return (
            <div >
                <div className='h-screen flex items-center justify-center ' style={{backgroundImage:"url('https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}} id='login' onClick={loginVisibility}>
                    <Toaster />
                    <div className= ' shadow-orange-300  bg-white w-[350px] p-6 rounded-md flex flex-col space-y-3 '>
                        <div>
                            <h1 className='text-4xl  mb-6 font-light text-sky-900'>Login</h1>
                        </div>
                        <form onSubmit={onLogin}>
                            <div className='flex flex-col space-y-8'>
                                <div className='border-2 border-gray-400 flex p-2 items-center  rounded-md ' >
                                    <FaRegUser />
                                    <input
                                        type="text"
                                        className='px-2 outline-none w-full' placeholder='enter your email'
                                        id='email'
                                        name='email'
                                        value={userCredentials.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='relative'>
                                    <div className='flex items-center border-2 border-gray-400 rounded-md  p-2'>
                                        <TbLockPassword />


                                        <input
                                            type={check ? 'text' : 'password'}
                                            className='px-2 outline-none  w-full rounded-sm  ' id='password'
                                            placeholder='enter password'
                                            value={userCredentials.password}
                                            name='password'
                                            onChange={handleInputChange} />

                                    </div>
                                    {
                                        check ?
                                        (
                                            
                                            <IoIosEye
                                            className='absolute top-2 right-2 ' onClick={handleCheck} />
                                        ) : (
                                            <FaEyeSlash className='absolute top-2 right-2 ' onClick={handleCheck} />
                                        )
                                        
                                        
                                    }
                                </div>

                                <button type='submit' className='bg-blue-600 flex justify-center  p-2 text-white cursor-pointer'>Login</button>
                            </div>
                        </form>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <div>
                            <p className='text-center'>OR</p>
                        </div>

                        <div className='m-auto'>
                            <p>Don't have an account?
                                <NavLink className="text-blue-600  underline" to='/signup'>signup</NavLink>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    export default Login

