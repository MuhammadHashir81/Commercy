import {  Outlet } from 'react-router-dom'
import SellerNavbar from './SellerNavbar';
const SellerAccount = () => {
  return (
    <div className='max-w-screen-2xl mx-auto  py-6'>

      {/* navbar start */}
      <SellerNavbar/>
      {/* navbar end */}

   <Outlet/>

    </div>
  )
}

export default SellerAccount