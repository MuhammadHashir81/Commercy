import { createContext,useEffect } from "react";


export const StripePostPaymentContext = createContext();

export const StripePostPaymentProvider = ({children})=>{

    const handlePostPayment = async()=>{
        const response = await fetch('http://localhost:5000/api/user-specific-items',{
            method:'GET',                       
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
        const data = await response.json()
        console.log(data)
}


return (
    
    <StripePostPaymentContext.Provider value={{handlePostPayment}}>
        {children}
    </StripePostPaymentContext.Provider>
)

}