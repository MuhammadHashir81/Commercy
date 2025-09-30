import { useContext,useEffect } from 'react'
import { SellerContext } from '../../ContextApi/Seller/SellerProvider'
const Dashboard = () => {
  const {getAllItems} = useContext(SellerContext)
  

  useEffect(() => {
    getAllItems()
  
  }, [])
  
  return (
    <div>dashboard</div>
  )
}

export default Dashboard