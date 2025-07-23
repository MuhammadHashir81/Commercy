import React from 'react'
import { useContext,useEffect } from 'react'
import { ShowItemsContext } from './ContextApi/ShowItems.jsx/ShowItems'
import { NavLink } from 'react-router-dom'

const AllItems = () => {
    const { items,fetchData} = useContext(ShowItemsContext )

    useEffect(() => {
      fetchData()
    
      
    }, [])
    
  return (
    
    <div className='max-w-screen-2xl mx-auto px-14 py-6' >
        <div className='flex flex-wrap items-center bg-gray-100'>
                
                        {
                            items.length > 0 && items.map((single, index) => (
                                <div className='w-[30%]  m-3 bg-white p-4' key={single._id} >

                                    <NavLink to={`/${single.category}`}>
                                        <img src={`http://localhost:5000/uploads/${single.image}`} alt="image not uploaded" className=' w-full h-[350px] object-cover  shadow-md'  />
                                    </NavLink>
                                        <div className=''>
                                        <p
                                         className='text-md font-normal my-2 text-gray-600 font-primary'>{single.description}</p>
                                        </div>
                                        
                                </div>


                            ))
                        }

                </div>
        </div>
  )
}

export default AllItems