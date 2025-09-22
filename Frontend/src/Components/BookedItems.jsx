import React from 'react'
import { useContext } from 'react'
import { StripePostPaymentContext } from './ContextApi/StripePostPaymentProvider'
const BookedItems = () => {
    const {handlePostPayment} = useContext(StripePostPaymentContext)
    React.useEffect(() => {
        handlePostPayment()
    }, [])

  return (
    <div className='max-w-screen-2xl mx-auto px-14 py-6'>
        
    </div>
  )
}

export default BookedItems