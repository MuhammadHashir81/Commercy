import { useEffect } from "react";
import { createContext, useState } from "react";
import Swal from 'sweetalert2'

export const AddToCartContext = createContext()


const AddToCartProvider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [productSuccess,setProductSuccess] = useState()


    // api call 

    const addToCartFunc = async (productId, title, description, image,price) => {
        const fetching = await fetch("http://localhost:5000/cart/add-cart", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: {
                    productId: productId,
                    title: title,
                    description: description,
                    image: image,
                    price:price
                }
            }),

        })
        const result = await fetching.json()
        console.log(result)
     
    if (fetching.ok) {
        setProductSuccess(result.success);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: result.success
        });
        console.log(result);
    } else if (fetching.status === 400 || fetching.status === 404) {
        setProductSuccess(result.error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: result.error
        });

    }
    fetchingAllCartItems()
};

// deleting single cart item from items array 


          const deletingSingleCartItem = async (id)=>{
            const response = await fetch(`http://localhost:5000/cart/delete-cart/${id}`,{
                headers:{
                    'Content-Type':'application/json'
                },
                method:'DELETE',
                credentials:'include'
            })
            const result = await response.json()

            console.log(result.cart.items)

            setCartItems(result.cart.items)


          }

        const fetchingAllCartItems = async () => {
            const fetching = await fetch("http://localhost:5000/cart/get-cart-items", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method:'GET',

                credentials: 'include'
            })

            const result = await fetching.json()
            if (result.success && result.success.items) {
                setCartItems(result.success.items);
            } else {
                setCartItems([]); // fallback if no items
            }

        }

        useEffect(() => {
          
        fetchingAllCartItems()
        }, [])
        
    return (
        <div>
            <AddToCartContext.Provider value={{ selectedItems, setSelectedItems, addToCartFunc, cartItems,fetchingAllCartItems, productSuccess,deletingSingleCartItem}}>
                {children}
            </AddToCartContext.Provider>
        </div>
    )
}



export default AddToCartProvider