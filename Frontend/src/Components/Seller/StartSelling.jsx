    import React, { useContext, useState } from 'react'
    import { FaUpload } from "react-icons/fa6";
    import { SellerContext } from '../ContextApi/Seller/SellerProvider';
    import { Toaster } from 'react-hot-toast';

    const StartSelling = () => {
        const { sellerCredentials, setSellerCredentials, sellerProductUpload } = useContext(SellerContext)
        const handleChange = (e) => {
            const { name, value } = e.target;
            if (name === "image") {
                setSellerCredentials((prev) => ({
                    ...prev,
                    image: e.target.files[0], // store actual file object
                }));
            } else {
                setSellerCredentials((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
            
            
            
            
        }
        const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("category",sellerCredentials.category)
        formData.append("inventory",sellerCredentials.inventory)
        formData.append("price",sellerCredentials.price)
        formData.append("image",sellerCredentials.image)
        formData.append("description", sellerCredentials.description)
        sellerProductUpload(formData)
        };
        
        return (

            <div className='max-w-screen-2xl mx-auto px-32 py-12 font-primary' >
                <Toaster/>
                <div className='flex space-x-24'>

                    <img src="https://plus.unsplash.com/premium_photo-1681426710520-7c56c9f563d2?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[50%] rounded-md' />
                    <div className=''>

                        <h1 className='text-5xl font-bold '>Start Selling on Commercy </h1>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col my-8'>
                                <input type="text" placeholder='product category' className='bg-gray-100 my-3  px-3 py-4 outline-none' required name='category' value={sellerCredentials.category}
                                    onChange={handleChange} />
                                <input type="number" placeholder='Inventory' className='bg-gray-100 my-3  px-3 py-4 outline-none' required name='inventory' value={sellerCredentials.inventory}
                                    onChange={handleChange} />
                                <input type="number" name='price' placeholder='price in dollars' className='bg-gray-100 my-3  px-3 py-4 outline-none' value={sellerCredentials.price}
                                    onChange={handleChange} />
                                    <textarea className='bg-gray-100 my-3  px-3 py-4 outline-none' name="description" id="description" cols="30" onChange={handleChange} value={sellerCredentials.description}></textarea>
                                <input type="file" name='image' id='image'  className='bg-black  my-3 flex justify-center text-white  px-3 py-4 cursor-pointer' required 
                                    onChange={handleChange} accept="image/*" />
                                <button type="submit" className='bg-amber-500 w-fit py-3 px-3 self-center  font-semibold my-5 flex items-center space-x-8 cursor-pointer ' name='image' onClick={handleSubmit}><FaUpload /> upload product</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        )
    }

    export default StartSelling








