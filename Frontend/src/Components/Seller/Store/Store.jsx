    import React, { useEffect, useState } from 'react'
    import { useContext } from 'react'
    import { SellerContext } from '../../ContextApi/Seller/SellerProvider'
    import Box from '@mui/material/Box';
    import Modal from '@mui/material/Modal';
    import { Toaster } from 'react-hot-toast';
    import { useNavigate } from 'react-router-dom';

    const Store = () => {
        const navigate = useNavigate()
        const { fetchUserSpecificItems, sellerProductArray, sellerDeleteItem, sellerUpdateItem } = useContext(SellerContext)

                const handleFetchUserSpecificItems = ()=>{
                        fetchUserSpecificItems()
                    
            }


        const [sellerUpdatedItem, setsellerUpdatedItem] = useState({})
        const [sellerUpdateId,setSellerUpdateId] = useState('')
        const [open, setOpen] = React.useState(false);
        const handleOpen = (item) => {
            setOpen(true)
            setsellerUpdatedItem(item)
            setSellerUpdateId(item._id)
        }
        const handleClose = () =>{
            setOpen(false)
            setSellerUpdateId('')
        }


        // fetch user specific items

        
    

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
        };


        // delete single item from seller product 

        const handleDelete = (id) => {
            sellerDeleteItem(id)
        }

        // set seller onChange

        const handleChange = (e) => {
            const { name, value } = e.target;
            if (name === "image") {
                setsellerUpdatedItem((prev) => ({
                    ...prev,
                    image: e.target.files[0], // store actual file object
                }));
            } else {
                setsellerUpdatedItem((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        }


        // update item in seller product 
        const handleUpdate = (e) => {
            e.preventDefault
            
        const data = new FormData()
            data.append("category",sellerUpdatedItem.category)
            data.append("inventory",sellerUpdatedItem.inventory)
            data.append("price",sellerUpdatedItem.price)
            data.append("image",sellerUpdatedItem.image)
            data.append("description", sellerUpdatedItem.description)
            sellerUpdateItem(sellerUpdateId,data)

        }

        // handleAddItem

        const handleAddItem = ()=>{
            navigate('/selleraccount/startselling')
        }


        return (
            <div className='max-w-screen-2xl px-14 mx-auto  py-24'>
                <div className=''>
                    <Toaster/>

                    <div>

                        {/* modal */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <form >
                                    <div className='flex flex-col' >

                                        <h2 className='font-semibold text-4xl '>Update item</h2>
                                        <input
                                            type="text"
                                            value={sellerUpdatedItem.category}
                                            onChange={handleChange}
                                            className='bg-gray-100 my-3  px-3 py-4 outline-none'
                                            name='category'
                                            placeholder='category'
                                        />
                                        <input type="number" name='inventory' placeholder='inventory' className='bg-gray-100 my-3  px-3 py-4 outline-none' value={sellerUpdatedItem.inventory} onChange={handleChange} />
                                        <input type="number" name='price' placeholder='price in dollars' className='bg-gray-100 my-3  px-3 py-4 outline-none' value={sellerUpdatedItem.price} onChange={handleChange} />

                                        <textarea type="text" className='bg-gray-100 my-3  px-3 py-4 outline-none'  name='description' value={sellerUpdatedItem.description} placeholder='description' cols="5" onChange={handleChange}></textarea>
                                        <input type="file"   name='image' id='image' className='bg-black  my-3 flex justify-center text-white  px-3 py-4 cursor-pointer'
                                            accept="image/*"  onChange={handleChange}/>
                                        <button type='button' onClick={handleUpdate} className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold' >edit</button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>

                        {/* modal end */}
                    </div>
                    <div className='flex justify-between'>

                    <h1 className='text-5xl font-bold '>Manage Your Products</h1>
                    <div className='flex space-x-3'>
                    <button className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold )' onClick={handleFetchUserSpecificItems}>Load Items</button>
                    <button className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold )' onClick={handleAddItem}>Add Item</button>
                    </div>
                    </div>

                    <div className='grid grid-cols-3 '>
                        {
                            sellerProductArray.length === 0 && (
                                <div className='text-3xl font-bold text-center mt-4 '>
                                    <h1 className='text-3xl font-bold '>Add products</h1>
                                </div>
                            )
                        }
                        {
                            sellerProductArray.map((item) => (
                                <div className='my-10 ' key={item._id} >
                                    <div className='w-fit  bg-gray-100 p-6 break-words'>
                                        <div className='w-[300px]'>

                                            <img  src={`http://localhost:5000/uploads/${item.image}`} alt="image not uploaded" />
                                            <p className='mt-5'>{item.description}</p>
                                            <div className='mt-3'>
                                                <p className='font-semibold text-lg'>total stock {item.inventory}</p>
                                                <p className='font-semibold text-lg'>price ${item.price}</p>
                                            </div>
                                            <div className='flex space-x-3'>

                                                <button className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold )' onClick={() => handleOpen(item)}>update</button>

                                                <button type='button'  className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold' onClick={() => handleDelete(item._id)}>delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }



                    </div>
                </div>
            </div>
        )
    }

    export default Store