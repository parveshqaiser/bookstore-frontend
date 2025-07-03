

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useBillingDetails } from '../shared/useBillingDetails';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { addOrderDetails } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const CheckoutPage = () => {
    let user = useSelector(store => store?.user?.user);
    let cart = useSelector(store => store?.cart?.cartItems);
    
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isCheck, setIsCheck] = useState(false)


    let dispatch = useDispatch();
    let navigate = useNavigate();

    function handleChange(idx)
    {
        setSelectedIndex(idx)
    }

    const handlePlaceOrder = async()=>{

        let product = cart && cart.map(book=>{
            return{
                productId : book?._id,
                quantity : book.qty,
                price : book?.perUnit,
            }
        });

        let address = user.address.find((_,index)=> index == selectedIndex);

        let data = {
            name : user?.name,
            email : user?.email,
            number : user?.number,
            orderedQuantity : cart.reduce((sum,book)=> sum + book?.qty,0),
            totalPrice : cart.reduce((sum, book)=> sum + book?.newPrice,0),
            address: address,
            products : product
        };

        let createOrder = { 
            name : user?.name,
            email : user?.email,
            amount :  cart.reduce((sum, book)=> sum + book?.newPrice,0),
        };


        try {
            let res = await axios.post(BASE_URL + "/create/paymnent" ,createOrder, {withCredentials: true});
            let {userId , orderId , keyId , amount, currency} = res?.data?.data

                const options = {
                    key: keyId,
                    amount: amount, 
                    currency: 'INR',
                    name: 'DevTinder',
                    description: 'Welcome to Razorpay',
                    order_id: orderId, 
                    prefill: {
                        name: user?.name,
                        email: user?.email,
                        contact: user?.number
                    },
                    theme: {
                        color: '#F37254'
                    },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return (
    <>
    <main className="max-w-5xl mx-auto px-4 py-8 my-20 space-y-6 bg-white rounded-lg shadow-sm">
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-lg text-gray-700 font-medium">🧾 Total Items: <span className="font-semibold">{cart.reduce((sum,book)=> sum + book?.qty,0)}</span></p>
            <p className="text-lg text-gray-700 font-medium">💰 Amount Payable: <span className="font-semibold text-green-600">$ {cart.reduce((sum, book)=> sum + book?.newPrice,0)}</span></p>
        </section>

        <h1 className="text-lg font-semibold text-gray-700">📦 Please Select the Billing Address</h1>
        
        {(user && user?.address?.length > 0) ? user.address.map((val,index)=>(
            <section className='flex gap-x-6 border border-dashed rounded-md p-2' key={index}>
                <div className='flex items-center'>
                    <input 
                        type="radio" 
                        className="h-4 w-4  focus:ring-blue-500 hover:ring-2 hover:ring-blue-400"
                        checked={selectedIndex == index} 
                        onChange={()=>handleChange(index)} 
                    />
                </div>
                <div className='space-y-1'>
                    <h1 className='font-semibold'>{user?.name}</h1>
                    <h1 className=''>{val?.doorNo} </h1>
                    <p className='text-sm'>{val?.city} , {val?.state} , {val?.pinCode}</p>
                    <p className='text-sm'>Phone number : {user?.number}</p>
                </div>
            </section>
        )): <p className='text-center font-extrabold text-lg text-gray-500'>No Address Found. Please Go to Profile to add Address</p>}

    {selectedIndex !==null && 
    <>
        <div className="flex items-center gap-2">
            <input type="checkbox" onChange={(e)=> setIsCheck(e.target.checked)} className="accent-purple-500 w-4 h-4" />
            <span className="text-sm text-gray-600">I agree to the <span className="underline cursor-pointer">terms & conditions</span></span>
        </div>
    
        <div className="flex justify-end">
            <button
                onClick={handlePlaceOrder}
                disabled={!isCheck}
                className={`px-4 py-2 border border-purple-600 text-violet-500 rounded-md transition text-sm font-medium ${isCheck? "cursor-pointer" : "cursor-not-allowed"}`}>
            🛍️ Place Order
            </button>
        </div>      
    </>}                 
    </main>
    </>
    )
}

export default CheckoutPage
