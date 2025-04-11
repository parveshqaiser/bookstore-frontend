

import React from 'react'
import { IoSettings } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardHeader = () => {

    return ( 
    <nav className='max-w-7xl mx-auto px-4 py-2 flex md:flex-row flex-col justify-between bg-gray-50'>

        <div className='space-y-2'>
            <h1 className='font-semibold text-2xl m-0 p-0 text-gray-600'>Dashboard</h1>
            <p className='text-[13px] font-primary text-gray-500 md:mb-0 mb-2' >Book Store Inventory</p>
        </div>

        <div className='flex flex-wrap justify-between items-center md:gap-4 gap-1'>
            <aside className='border flex items-center p-2  border-blue-800 rounded hover:text-blue-700 transition duration-200 text-sm'>
                <IoSettings className="mr-1" />
                <Link to="/admin/manage/orders">Manage Orders</Link>
            </aside>
            <aside className='border flex items-center p-2 border-purple-800 rounded hover:text-purple-700 transition duration-200 text-sm'>
                <ImBooks className="mr-1" />
                <Link to="/admin/manage/books"> Manage Books</Link>
            </aside>
        </div>
    </nav>
    )
}

export default DashboardHeader;
