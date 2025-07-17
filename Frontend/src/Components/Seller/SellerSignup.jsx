import React from 'react'
import { useContext,useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import  { Toaster } from 'react-hot-toast';
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { SellerContext } from '../ContextApi/Seller/SellerProvider';


const SellerSignup = () => {
    const [check,setCheck] = useState(true)

    const handleCheck = ()=>{
        setCheck(!check)
    }
    const navigate = useNavigate()

    const backToHome = () => {
        navigate('/selleraccount')
    }

    const signUpVisibility = (e) => {
        if (e.target.id === 'signup') {
            navigate('/')
        }

    }
    const { handleSignUpUser, userCredentials, setUserCredentials } = useContext(SellerContext)

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
            <div className='h-screen flex items-center justify-center ' style={{backgroundImage:"url('https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}} id='signup' onClick={signUpVisibility}>
                <Toaster/>
                <div className='bg-white w-[350px] p-6 rounded-md flex flex-col space-y-5 '>
                        <h1 className=' text-4xl mb-8 font-light text-sky-900'>Sign up</h1>
                    <label>
                        <form onSubmit={onSignup}>
                            <div className='flex flex-col space-y-8'>
                                <div className='flex items-center  px-2 border-2 border-gray-400 rounded-md'>
                                 <FaRegUser/>
                                <input
                                    type="text"
                                    required
                                    className='w-full p-2 rounded-sm outline-none '
                                    placeholder='enter your name'
                                    id='name'
                                    name='name'
                                    value={userCredentials.name}
                                    onChange={handleInputChange}
                                    />
                                    </div>

                                    <div className='flex items-center rounded-md border-2 border-gray-400  px-2'>
                                         <MdOutlineEmail />
                                <input
                                    type="email"
                                    required
                                    className='outline-none w-full p-2 rounded-sm ' placeholder='enter your email'
                                    id='email'
                                    name='email'
                                    value={userCredentials.email}
                                    onChange={handleInputChange}
                                    />
                                    </div>
                                <div className='relative'>
                                    <div className='flex items-center  px-2 border-2 border-gray-400 rounded-md'>
                                     <TbLockPassword/>

                                <input type={check ? 'password' : 'text'} className='outline-none p-2  w-full' id='password '
                                    placeholder='enter password'
                                    value={userCredentials.password}
                                    onChange={handleInputChange}
                                    required
                                    name='password'
                                    
                                    
                                    />
                                    </div>
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
                        <NavLink className="text-blue-600  underline" to='/login'>login</NavLink>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SellerSignup