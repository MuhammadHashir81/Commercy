import { useState } from "react";
import { createContext,useEffect } from "react";


export const StripePostPaymentContext = createContext();

export const StripePostPaymentProvider = ({children})=>{

    const [bookedItems,setBookedItems] = useState([])

    const handlePostPayment = async()=>{
        const response = await fetch('http://localhost:5000/api/user-specific-items',{
            method:'GET',                       
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
        const data = await response.json()
        setBookedItems(data.data)
        console.log(data.data[0].totalAmount);
}


return (
    
    <StripePostPaymentContext.Provider value={{handlePostPayment,bookedItems}}>
        {children}
    </StripePostPaymentContext.Provider>
)

}