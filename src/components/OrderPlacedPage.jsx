
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { removeOrderDetails } from '../redux/orderSlice';

const OrderPlacedPage = () => {

    let {storeOrderDetails} = useSelector(store => store?.order);

    let dispatch = useDispatch();

    // useEffect(() => {
    //     return () => {
    //         console.log("clean up done");
    //         dispatch(removeOrderDetails());
    //     };
    // }, []);

    return (
    <main className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Your Order Has Been Successfully Placed!</h1>
        <p className="text-base text-gray-500 mt-4">Ordered on: {new Date(`${storeOrderDetails?.createdAt}`).toLocaleString()}</p>
        <div className="space-y-2">
            <p><span className="font-semibold">Order ID:</span> {storeOrderDetails?._id}</p>
            <p><span className="font-semibold">Order Status:</span> Pending</p>
            <p><span className="font-semibold">Ordered By:</span> {storeOrderDetails?.name}</p>
            <p><span className="font-semibold">Email:</span> {storeOrderDetails?.email}</p>
            <p><span className="font-semibold">Phone:</span> {storeOrderDetails?.number}</p>
            <p><span className="font-semibold">Total Items:</span> {storeOrderDetails?.orderedQuantity}</p>
            <p><span className="font-semibold">Total Amount:</span>  $ {storeOrderDetails?.totalPrice}</p>
        </div>

        <div className="mt-4">
            <h2 className="font-semibold mb-2">Products:</h2>
           
            <ul className="list-disc list-inside space-y-1">
                {!!storeOrderDetails && storeOrderDetails?.product?.map(book=>(
                    <li key={book?._id}>Product ID: {book?._id} </li>
                ))}          
            </ul>
        </div>

        <div className="mt-4">
            <h2 className="font-semibold mb-2">Shipping Address:</h2>
            <p>{storeOrderDetails?.address?.doorNo} , {storeOrderDetails?.address?.city} , {storeOrderDetails?.address?.state}, {storeOrderDetails?.address?.pinCode} </p>
        </div>
       
        <div className="my-2 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm">
            📦 Estimated delivery by <span className="font-medium">4 to 6 days</span>.
        </div>
        <p className='text-sm text-center'>
            <Link to="/" className='text-gray-600 hover:text-gray-800 transition' >
            Go to Home <FaArrowRightLong className='inline ml-1' />
            </Link>
        </p>
    </main>
    )
}

export default OrderPlacedPage;
