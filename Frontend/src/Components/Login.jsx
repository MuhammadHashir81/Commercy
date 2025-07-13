import { useContext,useState } from 'react'
import { AuthenticationContext } from './ContextApi/AuthenticationProvider'
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { handleLoginUser, userCredentials, setUserCredentials } = useContext(AuthenticationContext)

    const [check, setCheck] = useState(true)

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
        <div>
            <div className='h-screen flex items-center justify-center bg-gradient-to-r from-black from-5%  to-sky-900' id='login' onClick={loginVisibility}>
                <Toaster />
                <div className='bg-white w-[500px] p-10 rounded-md flex flex-col space-y-5 '>
                    <div className='flex justify-between '>
                        <h1 className=' text-3xl mb-8'>Login</h1>
                        <RxCross1 onClick={backToHome} className='cursor-pointer' />
                    </div>
                    <form onSubmit={onLogin}>
                        <div className='flex flex-col space-y-8'>
                            <input
                                type="text"
                                className='outline-2 outline-gray-400 focus:outline-blue-500 p-2 rounded-sm ' placeholder='enter your email'
                                id='email'
                                name='email'
                                value={userCredentials.email}
                                onChange={handleInputChange}
                            />
                            <div className='relative'>

                                <input
                                    type={check ? 'text' : 'password'}
                                    className='outline-2 outline-gray-400 focus:outline-blue-500 p-2 w-full rounded-sm  ' id='password'
                                    placeholder='enter password'
                                    value={userCredentials.password}
                                    name='password'
                                    onChange={handleInputChange} />

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

                            <button type='submit' className='bg-blue-600 flex justify-center rounded-sm p-2 text-white cursor-pointer'>Login</button>
                        </div>
                    </form>
                    <div>
                        <p className='text-center'>OR</p>
                    </div>
                    <div className='m-auto'>
                        <p>Don't have an account?
                            <NavLink className="text-blue-600 p-2 underline" to='/signup'>signup</NavLink>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login