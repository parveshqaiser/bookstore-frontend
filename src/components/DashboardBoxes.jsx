

import React, { useEffect, useRef } from 'react';
import { MdIncompleteCircle, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { useSelector } from 'react-redux';


const DashboardBoxes = () => {
    let {totalBooks, totalQtySold,totalSales} = useSelector(store => store?.dashboard);

    console.log("totalQtySold ", totalQtySold);
    console.log("totalSales", totalSales);

    
    return (
    <main className='max-w-7xl mx-auto px-4 py-1 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-4'>
        <nav className='p-2 flex items-center bg-white shadow rounded-lg'>
            <div className='inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-pink-600 bg-pink-100 rounded-full mx-5'>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <div className=''>
                <span className="block text-lg font-semibold">{totalBooks || "NA"}</span>
                <span className="block text-gray-500 text-sm">Total Books</span>
            </div>
        </nav>
        <nav className='p-2 flex items-center bg-white shadow rounded-lg'>
            <div className='inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-green-600 bg-green-100 rounded-full mx-5'>
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            </div>
            <div className=''>
                <span className="block text-lg font-semibold">$ {totalSales[0]?.totalSales || "NA"}</span>
                <span className="block text-gray-500 text-sm">Total Sales</span>
            </div>
        </nav>
        <nav className='p-2 flex items-center bg-white shadow rounded-lg'>
            <div className='inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-blue-600 bg-blue-100 rounded-full mx-5'>
                <MdOutlineProductionQuantityLimits className='size-6'/>
            </div>
            <div className=''>
                <span className="block text-lg font-semibold">10</span>
                <span className="block text-gray-500 text-sm">Orders Received</span>
            </div>
        </nav>
        <nav className='p-2 flex items-center bg-white shadow rounded-lg'>
            <div className='inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-purple-600 bg-purple-100 rounded-full mx-5'>
                <MdIncompleteCircle className='size-6'/>
            </div>
            <div>
                <span className="block text-lg font-semibold">{totalQtySold[0]?.totalQtySold || "NA"}</span>
                <span className="block text-sm text-gray-500">Total Items Sold</span>
            </div>
        </nav>
    </main>
    )
}

export default DashboardBoxes;



/* 
 <main className=''>
        <nav className='mx-5 my-4 p-2 bg-white grid grid-cols-2 gap-x-10'>
            <div>
                <h2 className="text-center text-xl font-bold mb-4">Monthly Sales Report - 2025</h2>
                <Bar data={data} options={options} />
            </div>            
            <div className='max-w-sm '>
                <h2 className="text-center text-xl font-bold mb-4">Category Wise Sales Report - 2025</h2>
                <Pie data={data1} options={options1} />
            </div>
        </nav>
    </main>

*/