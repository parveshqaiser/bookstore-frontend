

import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingOrders } from '../redux/orderSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import bookLoading from "../assets/bookLoading.gif";
import toast , { Toaster } from 'react-hot-toast';

const ManageOrders = () => {

    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllPendingOrders());
    },[dispatch]);

    let {allPendingOrders, isLoading} = useSelector(store=> store?.order);
    
    const handlePlaceItems = async (id)=>{

        try {
            let res = await axios.post(BASE_URL + `/admin/update/order/status/${id}`, {orderStatus : "Delivered"}, {withCredentials:true});
            if(res.data.success)
            {
                toast.success(`${res.data.message}`,{duration:2500})
                setTimeout(()=>{
                    dispatch(getAllPendingOrders());
                },1200)
               
            }
        } catch (error) {
            console.log("some error in placing order");
            toast.error(`${error?.response?.data?.message || "Failed to Deliver Order"}`,{duration:2500})
        }
    }

    if (isLoading) 
    {
        return (
        <div className="mx-auto mt-10 w-52 text-center">
            <img src={bookLoading} className="w-16 h-16 rounded-lg mx-auto" />
            <p className="text-gray-600 mt-4">Loading... Please Wait.</p>
        </div>)
    };

    return (
        <>
        <Toaster />
        <AdminNavbar />
        <main className="max-w-6xl mx-auto p-4">
            <div className='flex sm:flex-row flex-col sm:gap-0 gap-2 justify-between'>
                <Link to="/admin/dashboard">
                    <button className='px-2 py-2 border text-sm border-blue-600 text-violet-600 rounded-md cursor-pointer'>⬅️ Go Back</button>
                </Link>
                <Link to="/admin/manage/orders/delivered">
                    <button className='px-2 py-2 border text-sm border-blue-600 text-violet-600 rounded-md cursor-pointer'>📖 Orders Delivered</button>
                </Link>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 my-3">Pending Orders ({allPendingOrders?.length})</h2>
            {allPendingOrders?.length ==0 ? <p className='text-center text-purple-600 bg-gray-100 p-2 rounded-md'>No New Orders. Please Refresh to check for new orders!!!</p> : allPendingOrders && allPendingOrders.map((order) => (
            <div 
                key={order._id}
                className="bg-white p-5 rounded-lg shadow-md mb-6 border border-gray-200"
            >
                <p className=''>  Order No : {order?._id}</p>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500"> Order Date : {order.createdAt.split("T")[0]}</span>
                    <span className="px-3 py-1 text-xs font-semibold uppercase rounded-md bg-amber-200 text-yellow-700">
                        {order.orderStatus}
                    </span>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                        <p className="text-lg font-medium text-purple-700">{order.name}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                        <p className="text-sm text-gray-600">📞 {order.number}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p className="font-medium">📍 Billing Address</p>
                        <p>{order.address.doorNo}, {order.address.city}, {order.address.state}</p>
                        <p>Pin Code: {order.address.pinCode}</p>
                    </div>
                </div>

                <p className="my-2 text-md font-medium text-gray-700">📚 Ordered Items</p>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 mt-2 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2 text-left">Product Id</th>
                                <th className="p-2 text-left">Title</th>
                                <th className="p-2 text-left">Author</th>
                                <th className="p-2 text-left">Publisher</th>
                                <th className="p-2 text-center">Quantity</th>
                                <th className="p-2 text-center">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.bookDetails.map((book, index) => (
                            <tr key={index} className="border-t text-gray-600">
                                <td className="p-2">{order.product[index].productId}</td>
                                <td className="p-2">{book?.title}</td>
                                <td className="p-2">{book?.author}</td>
                                <td className="p-2">{book?.publisher}</td>
                                <td className="p-2 text-center">{order.product[index].quantity}</td>
                                <td className="p-2 text-center">${order.product[index].price}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex sm:flex-row flex-col justify-between sm:items-center">
                   <div className='flex sm:gap-2.5 justify-between sm:mb-0 mb-2'>
                        <span className="text-md font-medium text-gray-700">
                            🛒 Total Price : <span className="font-bold text-green-600">${order.totalPrice}</span>
                        </span>
                        <span className="text-md font-medium text-gray-700">
                            Total Items:{order.orderedQuantity}
                        </span>
                   </div>
                    <button 
                        onClick={()=>handlePlaceItems(order._id)} 
                        className="px-4 py-2 text-sm rounded-md text-purple-900 border border-purple-800 hover:text-white hover:bg-purple-500 cursor-pointer"
                    >
                        Place Items
                    </button>
                </div>
            </div>
            ))}
        </main>
        </>
    )
}

export default ManageOrders
