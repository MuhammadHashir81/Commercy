import { NavLink } from 'react-router-dom'
import { SellerContext} from '../ContextApi/Seller/SellerProvider';
import { useContext } from 'react';
import { FaLock } from "react-icons/fa";


const SellerNavbar = () => {
    const { sellerLoginStatus,sellerLoginPicture} = useContext(SellerContext)
     const {logOutUser} = useContext(SellerContext)

 const handleSellerLogout = ()=>{
  logOutUser()
 }
  return (

    <div className='max-w-screen-2xl mx-auto  '>

      {/* navbar start */}
      <nav className='sticky px-14 mt-3'>
        <div className='flex  space-x-8'>

          <NavLink to='/selleraccount'>
            <h3 className='font-bold font-primary text-4xl text-amber-500' >Commercy </h3>
          </NavLink>
          <ul className=' w-full flex items-center space-x-5'>
            <li className='font-primary '><NavLink to="/selleraccount/startselling">Start Selling</NavLink></li>
            <li className='font-primary '><NavLink to="store"> Store</NavLink></li>
            <li className='font-primary '><NavLink to="dashboard">Dashboard</NavLink></li>
          </ul>
          <div className='flex space-x-2  h-[40px] '>
            {
              !sellerLoginStatus ? (
                  <>
                <NavLink to="/sellerlogin" className=' font-semibold rounded-4xl bg-gray-100 h-fit  px-7 py-3 flex items-center justify-between shadow-sm'><FaLock className='mr-2' /> Login</NavLink>
                <NavLink className='font-semibold shadow-sm rounded-4xl  bg-amber-500 h-fit px-7 py-3' to="/sellerlogin">Signup</NavLink>
                  </>
              ):(
                <div className='flex items-center space-x-3'>
                <button className='bg-red-500 rounded-md px-3 text-white cursor-pointer py-2' onClick={handleSellerLogout}>logout</button>
                
                </div>
              )
            }
            {
                 sellerLoginStatus && sellerLoginPicture && (
                    <img src={sellerLoginPicture} alt="sellerloginpircure" className='rounded-full'/>
                  )
                }
          </div>
        </div>

      </nav>        
    </div>

  )
}

export default SellerNavbar