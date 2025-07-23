import { useContext,useEffect } from 'react'
import { ShowItemsContext } from '../ContextApi/ShowItems.jsx/ShowItems'
import { NavLink } from 'react-router-dom'

const Watches = () => {
    const { items, fetchData } = useContext(ShowItemsContext)

    useEffect(() => {
        fetchData()
    }, [])

    const filtered = items.filter(item => item.category === 'watches')
    console.log(filtered)


    return (

        <div className='max-w-screen-2xl mx-auto px-14 py-6'>
            <h1 className='text-6xl font-bold mb-6' >Watches</h1>
            <div className='flex flex-wrap items-center bg-gray-100'>


                {
                    filtered.length > 0 && filtered.map((single, index) => (
                        <>
                            <div className='w-[30%]  m-3 bg-white p-4' key={single._id} >
                                <NavLink to={`/single/${single._id}` }>

                                <img src={`http://localhost:5000/uploads/${single.image}`} alt="image not uploaded" className=' w-full h-[350px] object-cover  shadow-md' />
                                </NavLink>
                                <div className=''>
                                    <p
                                        className='text-md font-normal my-2 text-gray-600 font-primary'>{single.description}</p>
                                        <p>Total Stock{single.inventory}</p>
                                </div>

                            </div>
                        </>

                    ))
                }

            </div>
        </div>
    )
}

export default Watches
