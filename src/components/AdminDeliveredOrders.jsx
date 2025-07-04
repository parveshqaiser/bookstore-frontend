

import React, { useEffect, useMemo, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDeliveredOrders } from '../redux/orderSlice';
import bookLoading from "../assets/bookLoading.gif";

const AdminDeliveredOrders = () => {


    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDeliveredOrders());
    },[dispatch]);

    let {allDeliveredOrders, isLoadingDelivered} = useSelector(store=> store?.order);

    const [searchText, setSearchText] = useState("");
    // const [tableData , setTableData] = useState(allDeliveredOrders); 

    // useEffect(()=>{
    //     let modify = allDeliveredOrders && allDeliveredOrders.filter((val) => 
    //     val.name.toLowerCase().includes(searchText.toLowerCase()) || 
    //     val?._id?.toLowerCase().includes(searchText.toLowerCase()) || 
    //     val?.bookDetails?.some(pub => pub?.publisher?.toLowerCase().includes(searchText.toLowerCase()))
    // );
  
    // },[searchText]);

    let tableData = useMemo(()=>{
        let modify = allDeliveredOrders && allDeliveredOrders.filter((val) => 
            val.name.toLowerCase().includes(searchText.toLowerCase()) || 
            val?._id?.toLowerCase().includes(searchText.toLowerCase()) || 
            val?.bookDetails?.some(book => book?.title?.toLowerCase().includes(searchText.toLowerCase()) || book?.publisher?.toLowerCase().includes(searchText.toLowerCase()))
        );
        return modify;
    },[searchText , allDeliveredOrders]);

    if (isLoadingDelivered) 
    {
        return (
        <div className="mx-auto mt-10 w-52 text-center">
            <img src={bookLoading} className="w-16 h-16 rounded-lg mx-auto" />
            <p className="text-gray-600 mt-4">Loading... Please Wait.</p>
        </div>)
    };

    return (
       <>
        <AdminNavbar />
        <main className="max-w-6xl mx-auto p-4">
            <Link to="/admin/manage/orders">
                <button className='px-2 py-2 border text-sm border-blue-600 text-violet-600 rounded-md cursor-pointer'>⬅️ Go Back</button>
            </Link> 

            <div className='my-3'>
                <input 
                    type="text"
                    onChange={(e)=>setSearchText(e.target.value)}
                    placeholder="Search By Order Id , Customer Name , Book Name , Publisher Name."
                    className="w-full px-2 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                />
            </div>

            {tableData?.length ==0 ?
            <p className='text-center text-purple-600 bg-gray-100 p-2 rounded-md'>No Such Delivered Orders Found</p> 
            : tableData?.map((order, index) => (
            <div 
                key={order._id}
                className="p-5 rounded-lg shadow-md my-6 border border-gray-200 bg-[#F9FBFC] transition-all duration-300 transform hover:-translate-y-0.5"
            >
                <p># {index+1}</p>
                <p className=''>  Order No : {order?._id}</p>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-green-800"> Order Date : {order.createdAt.split("T")[0]}</span>
                    <span className="text-sm text-green-800"> Delivered Date : {order.updatedAt.split("T")[0]}</span>
                  
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
                    <table className="w-full table-auto border border-gray-200 mt-2 text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2 text-left">Product Id</th>
                                <th className="p-2 text-left">Title</th>
                                <th className="p-2 text-left">Author</th>
                                <th className="p-2 text-left">Publisher</th>
                                <th className="p-2 text-left">Pages</th>
                                <th className="p-2 text-left">Language</th>
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
                                <td className="p-2">{book?.pages}</td>
                                <td className="p-2">{book?.language}</td>
                                <td className="p-2 text-center">{order.product[index].quantity}</td>
                                <td className="p-2 text-center">₹ {order.product[index].price}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between items-center">                   
                    <span className="text-md font-medium text-gray-700">
                        🛒 Total Price : <span className="font-bold text-green-600"> ₹ {order.totalPrice}</span>
                    </span>
                    <span className="text-md font-medium text-gray-700">
                        Total Items : {order.orderedQuantity}
                    </span>
                </div>
            </div>
            ))}
        </main>
       </>
    )
}

export default AdminDeliveredOrders;
