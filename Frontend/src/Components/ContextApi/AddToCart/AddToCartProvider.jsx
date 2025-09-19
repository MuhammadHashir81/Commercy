    import { useEffect } from "react";
    import { createContext, useState,useContext } from "react";
    import { ShowItemsContext } from "../ShowItems.jsx/ShowItems";
    import Swal from 'sweetalert2'

    export const AddToCartContext = createContext()


    const AddToCartProvider = ({ children }) => {
        const [selectedItems, setSelectedItems] = useState([])
        const [cartItems, setCartItems] = useState([])
        const [productSuccess,setProductSuccess] = useState()
        const {decrementInventory,productQuantity,singleItem} = useContext(ShowItemsContext)


        // api call 

        const addToCartFunc = async (items) => {
            const fetching = await fetch("http://localhost:5000/cart/add-cart", {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials: "include",
                body:JSON.stringify({items}),
            })
            const result = await fetching.json(fetching)
            // setCartItems(result)
            console.log(result)
        
        if (fetching.ok)     {
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
                console.log(result)
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
                <AddToCartContext.Provider value={{ selectedItems, setSelectedItems, addToCartFunc, cartItems, productSuccess,deletingSingleCartItem,setCartItems}}>
                    {children}
                </AddToCartContext.Provider>
            </div>
        )
    }



    export default AddToCartProvider