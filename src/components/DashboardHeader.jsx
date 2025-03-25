

import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { IoSettings , IoExpandOutline} from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
    
    return ( 
    <React.Fragment>
        <nav className=''>

            {/* <div className='w-16 min-h-[88vh] bg-blue-50 inline-block'>
                <div className='my-4 mx-3'>
                    <IoMdAdd className=' cursor-pointer' size={24} />
                </div>
                <div className='my-3 mx-3'>
                    <IoExpandOutline size={24}  className='cursor-pointer'/>
                </div>               
            </div> */}

            {/* right side container */}
            <div className='flex justify-between py-2 bg-gray-50'>
                <div className='ml-3'>
                    <span className='block font-semibold text-2xl m-0 p-0 text-gray-600'>Dashboard</span>
                    <span className='text-xs font-primary'>Book Store Inventory</span>
                </div>
                <div className='flex gap-4 items-center mr-3'>
                    <Link to="/admin/manage/orders" className="flex items-center px-3 py-2 border border-blue-800 rounded hover:text-blue-700 transition duration-200 text-sm whitespace-nowrap">
                        <IoSettings className="mr-1" />
                        <span>Manage Orders</span>
                    </Link>

                    <Link to="/admin/manage/books" className="flex items-center px-3 py-2 border border-purple-800 rounded hover:text-purple-700 transition duration-200 text-sm whitespace-nowrap">
                        <ImBooks className="mr-1" />
                        <span>Manage Books</span>
                    </Link>
                    
                </div>
            </div>
        </nav>
    </React.Fragment>
    )
}

export default DashboardHeader;