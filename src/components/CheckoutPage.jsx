

import React, { useState } from 'react'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { useBillingDetails } from '../shared/useBillingDeatils';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import { addOrderDetails } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const CheckoutPage = () => {
    let user = useSelector(store => store?.user?.user);
    let cart = useSelector(store => store?.cart?.cartItems);

    const {formValues, setFormValues} = useBillingDetails();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [isCheck, setIsCheck] = useState(false);
    let phoneExp = new RegExp("^[6-9]\\d{9}$"); 

    function handleChange(e)
    {
        let {name, value} = e.target;

        let newValues = {...formValues};

        if(name == "number")
        {
            newValues[name] = {
                value : value && value >= 6 ? parseInt(value) || "" :"",
                error : !value ? "Required" : (value >=0 && value <=5) ? "Mobile Number must start between 6-9 & must be 10 digits":"",
            }
        }

        if(name == "doorNo" || name == "city" || name == "state")
        {
            newValues[name] = {
                value : value && value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required" : ""
            }
        }

        if(name == "pinCode"){
            newValues[name] = {
                value : parseInt(value) || "",
                 error : !value ? "Required" : ""
            }
        }    
        setFormValues(newValues)
    }

    const handlePlaceOrder = async()=>{

        let product = cart && cart.map(book=>{
            return{
                productId : book?._id,
                quantity : book.qty,
                price : book?.perUnit,
            }
        });

        let address = {
            doorNo : formValues.doorNo.value,
            city : formValues.city.value,
            state : formValues.state.value,
            pinCode : formValues.pinCode.value,
        };

        let data = {
            name : user?.name,
            email : user?.email,
            number : formValues.number.value,
            orderedQuantity : cart.reduce((sum,book)=> sum + book?.qty,0),
            totalPrice : cart.reduce((sum, book)=> sum + book?.newPrice,0),
            address: address,
            products : product
        };

        try {
            let res = await axios.post(BASE_URL + "/order/book", data, {withCredentials:true});
            if(res.data.success)
            {
                toast.success(res.data.message, {duration:2000});
                dispatch(addOrderDetails(res.data.data));
                dispatch(clearCart());
                setTimeout(()=>{
                    navigate("/order/details")                    
                },2000)
                
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return (
        <>
            <NavBar user={user} />
            <main className="max-w-5xl mx-auto px-4 py-8 my-20 space-y-8 bg-white rounded-lg shadow-sm">
                <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <p className="text-lg text-gray-700 font-medium">🧾 Total Items: <span className="font-semibold">{cart.reduce((sum,book)=> sum + book?.qty,0)}</span></p>
                    <p className="text-lg text-gray-700 font-medium">💰 Amount Payable: <span className="font-semibold text-green-600">$ {cart.reduce((sum, book)=> sum + book?.newPrice,0)}</span></p>
                </section>

                <h1 className="text-lg font-semibold text-gray-700">📦 Please Fill the Billing Address</h1>

                <section className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={user?.name}
                                readOnly
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />                           
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="text"
                                value={user?.email}
                                readOnly
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                title='Only Numbers Are Allowed'
                                maxLength={10}
                                name='number'
                                onChange={handleChange}
                                value={formValues.number.value}
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <span className='text-red-500 text-sm'>{formValues.number.error}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Address / Door No / Street</label>
                        <input
                            type="text"
                            name='doorNo'
                            onChange={handleChange}
                            value={formValues.doorNo.value}
                            className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <span className='text-red-500 text-sm'>{formValues.doorNo.error}</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name='city'
                                onChange={handleChange}
                                value={formValues.city.value}
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <span className='text-red-500 text-sm'>{formValues.city.error}</span>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                name='state'
                                onChange={handleChange}
                                value={formValues.state.value}
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <span className='text-red-500 text-sm'>{formValues.state.error}</span>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Pin Code</label>
                            <input
                                type="text"
                                name='pinCode'
                                maxLength={6}
                                onChange={handleChange}
                                value={formValues.pinCode.value}
                                className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <span className='text-red-500 text-sm'>{formValues.pinCode.error}</span>
                        </div>
                    </div>
            
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
                </section>                
            </main>
        </>
    )
}

export default CheckoutPage
