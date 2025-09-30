import React, { useEffect } from 'react'
import { createContext,useCallback , useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export const SellerContext = createContext()


const SellerProvider = ({ children }) => {

    const [sellerCredentials, setSellerCredentials] = useState({
        category: '',
        inventory: '',
        price: '',
        image: '',
        description: ''
    })
    const navigate = useNavigate()
    const [sellerLoginPicture, setsellerLoginPicture] = useState(
        localStorage.getItem('sellerLoginPicture' || null)
    )
    const [sellerLoginStatus, setsellerLoginStatus] = useState(
        localStorage.getItem('sellerLoginStatus' || false)
    )

    // user credentials
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })


    //  user specific items 
    const [userItems, setUserItems] = useState({
        category: '',
        inventory: '',
        price: '',
        description: '',
        image: ''
    })

    // seller product array 

    const [sellerProductArray, setSellerProductArray] = useState([])


    const baseUrl = "http://localhost:5000"

    //login seller

    const handleLoginUser = async () => {
        const loginUser = await fetch(`${baseUrl}/seller/seller-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email: userCredentials.email, password: userCredentials.password })
        })
        if (loginUser.ok) {
            const result = await loginUser.json()
            console.log(result)
            toast.success(result.success)
            setTimeout(() => {
                navigate('/selleraccount/store')
            }, 2000);
            setUserCredentials({
                email: '',
                password: ''
            })
            console.log(loginUser.data)



            //store the status of logged in user in local storage 
            setsellerLoginStatus(true)
            localStorage.setItem('sellerLoginStatus', true)
        }

        else if (loginUser.status === 400) {
            setUserCredentials({
                email: '',
                password: ''
            })
            const result = await loginUser.json()
            toast.error(result.error)
        }
    }

    // signup seller

    const handleSignUpUser = async () => {
        const signupUser = await fetch(`${baseUrl}/seller/seller-signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name: userCredentials.name, email: userCredentials.email, password: userCredentials.password })
        })
        if (signupUser.ok) {
            const result = await signupUser.json()
            console.log(signupUser)
            setTimeout(() => {
                navigate('/sellerlogin')
            }, 2000);
            console.log(result)
            toast.success(result.success)
            setUserCredentials({
                name: '',
                email: '',
                password: ''
            })
        }
        else if (signupUser.status === 400) {
            const result = await signupUser.json()
            toast.error(result.error)
             setUserCredentials({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    // login with google 

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google user info: ", decoded);

            // Send token to backend
            const res = await fetch("http://localhost:5000/seller/seller-google-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    token: credentialResponse.credential,
                }),
            });
            
            const data = await res.json();
            console.log(data)

            if (res.ok) {
                console.log(data.user.picture);

                setsellerLoginPicture(data.user.picture)
                localStorage.setItem('sellerLoginPicture', data.user.picture)

                //store the status of logged in user in local storage 
                setsellerLoginStatus(true)
                localStorage.setItem('sellerLoginStatus', true)
                navigate("/selleraccount");
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Google login error: ", error);
        }
    }

    // logout seller 

    const logOutUser = async () => {
        const response = await fetch('http://localhost:5000/seller/seller-logout', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        })
        if (response.ok) {

            const data = await response.json()
            console.log(data)
            toast.success(data.success)
        
            localStorage.removeItem('sellerLoginPicture')
            setsellerLoginPicture(null)
            setsellerLoginStatus(false)
            localStorage.removeItem('sellerLoginStatus')
            navigate('/selleraccount')

        }
        else {
            toast.error("Something went wrong")
        }
    }

    // seller upload product 


    // fetching user specific items

    const fetchUserSpecificItems = async () => {
        const response = await fetch("http://localhost:5000/seller/allitems", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"

        })
        if (response.ok) {
            const data = await response.json()
            setSellerProductArray(data.success)
            console.log("Fetched items:", data.success);
        } else {
            const data = await response.json()
            console.error("Error:", data);
            // toast.error(data.error);
        }


    }

    
    const sellerProductUpload = async (formData) => {
        const response = await fetch('http://localhost:5000/seller/upload-product', {
            "method": "POST",
            body: formData,
            credentials: "include"
        })
            if (response.ok) {
            const data = await response.json()
            console.log(data)
            toast.success(data.success)
            setSellerCredentials({
                category: '',
                inventory: '',
                price: '',
                image: '',
                description: ''
            })
            setTimeout(() => {
                navigate('/selleraccount/store')

            }, 3000);
            fetchUserSpecificItems()
            }
        else if (response.status === 400) {
            const data = await response.json()
            toast.error(data.error)
        }
    }

    // delete seller relavent item

    const sellerDeleteItem = async (id) => {
        const response = await fetch(`http://localhost:5000/seller/delete-item/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json()
        // const filteredData = sellerProductArray.filter(item => sellerProductArray._id != item._id)

        // setSellerProductArray(filteredData)

        fetchUserSpecificItems()
        toast.success(data.success)
        console.log(data)

    }


    const sellerUpdateItem = async (id, formData) => {
        const response = await fetch(`http://localhost:5000/seller/update-item/${id}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
        console.log(response)
        const data = await response.json()
        fetchUserSpecificItems()
        toast.success(data.success)

        console.log(data)

    }

    const getAllItems = async () => {
        const response = await fetch(`http://localhost:5000/seller/get-items`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        console.log(data)

    }

    // get all the booked items of the seller




    

    return (
        <div>
            <SellerContext.Provider value={{ handleSignUpUser, handleLoginUser, userCredentials, setUserCredentials, handleGoogleLoginSuccess, sellerLoginPicture, logOutUser, sellerLoginStatus, sellerCredentials, setSellerCredentials, sellerProductUpload,  userItems, setUserItems, sellerProductArray, sellerDeleteItem, sellerUpdateItem,fetchUserSpecificItems,getAllItems }}>
                {children}
            </SellerContext.Provider>
        </div>
    )
}

export default SellerProvider