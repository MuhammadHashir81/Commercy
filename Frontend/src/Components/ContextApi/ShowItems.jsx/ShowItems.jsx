import { set } from "mongoose";
import { useContext, createContext, useState, useEffect } from "react";
export const ShowItemsContext = createContext()



const ShowItemsProvider = ({ children }) => {
    const [singleItem, setSingleItem] = useState('')
    const [items, setItems] = useState([])
    const [productQuantity, setProductQuantity] = useState(0)
    const [totalStock, setTotalStock] = useState()



    const baseUrl = "http://localhost:5000"

    // fetch all the items

    const fetchData = async () => {

        const fetchingData = await fetch(`${baseUrl}/items/get-all-items`, {

            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await fetchingData.json()
        console.log(result.success)
        setItems(result.success)
    }

    // get the selected items by the user after checkout

    const getSelectedItems = async () => {
        const response = await fetch(`${baseUrl}/items/get-selected-items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const result = await response.json()
        console.log(result.selectedItems)
    }

    // get single item 

    const getSingleItem = async (id) => {
        const response = await fetch(`${baseUrl}/items/get-single-item/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await response.json()
        console.log(result.getSingleItem.inventory)
        setTotalStock(result.getSingleItem.inventory)
        setSingleItem(result.getSingleItem)

    }

    // set inventory 
    const decrementInventory = async (id) => {
        const response = await fetch(`${baseUrl}/items/decrement-inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, quantity: productQuantity })
        })
        console.log(response)
        const result = await response.json()
        console.log(result)
        // setTotalStock(result.success)


    }



    return (
        <div>
            <ShowItemsContext.Provider value={{ items, setItems, fetchData, getSingleItem, setSingleItem, singleItem, productQuantity, setProductQuantity, totalStock, setTotalStock, decrementInventory }}>
                {children}
            </ShowItemsContext.Provider>
        </div>
    )

}

export default ShowItemsProvider