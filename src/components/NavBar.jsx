

import React, { useState } from 'react';
import { HiMiniBars4 } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import {Link} from "react-router-dom";
import cart from "../assets/cart-logo.png";
import avatar from "../assets/avatar.png";
import cart1 from "../assets/cart-logo3.jpg";
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';

const NavBar = ({user}) => {

    let [toggle, setToggle] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let {cartItems} = useSelector(store => store?.cart);

    const handleLogout = async ()=>{

        try {
            let res = await axios.post(BASE_URL + "/user/logout",{}, {withCredentials:true});
            if(res.data.success)
            {
                toast.success(res?.data?.message, {duration:2000});
                setTimeout(()=>{
                    navigate("/user/signin");
                    dispatch(logoutUser());
                },1400)                
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return (
        <header className="max-w-6xl mx-auto flex md:flex-row items-center justify-between fixed top-0 left-0 right-0 bg-white shadow-md p-3">      
        <Toaster />     
            <div className="flex items-center gap-3">
                <Link to="/home">
                <HiMiniBars4 size={26} className="text-purple-500 cursor-pointer hover:text-purple-600 transition duration-200" />
                </Link>
                <div className="">
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-auto px-2 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-500"
                    />
                </div>
            </div>
    
            <div className="flex justify-between items-center gap-x-4">
                <span className='text-[14px]'>{user?.name || ""}</span>
                <aside className='flex gap-x-1'>
                    <Link to="/cart/items">                   
                        <FaCartPlus size={24} className='hover:text-purple-700' title='Cart' />
                    </Link>
                    <span>{cartItems && cartItems.length || 0}</span>
                </aside>
                <aside  className='relative cursor-pointer' onClick={()=>setToggle(!toggle)}>
                    <IoPersonCircle size={24} className={`${user?.name ? "text-green-500" : "text-red-600"}`} />
                    {toggle &&(
                    <div className='absolute right-0 top-[50px] w-48 bg-gray-100 shadow-lg rounded-md'>
                        <ul className='py-2'>                    
                            <li className='hover:bg-gray-200 p-2 text-sm'>
                                <Link className='block' to="/">Admin Login</Link>
                            </li>
                            {!user && (<li className='hover:bg-gray-200 p-2 text-sm'>
                                <Link className='block' to="/user/signin">User Login</Link>
                            </li>)}
                            <li className='hover:bg-gray-200 p-2 text-sm'>
                                <Link className='block' to="/user/profile">User Profile</Link>
                            </li>
                            {cartItems && cartItems.length >0 &&(<li className='hover:bg-gray-200 p-2 text-sm'>
                                <Link className='block' to="/cart/checkout">Checkout</Link>
                            </li>)}
                            {user && (<li className='hover:bg-gray-200 p-2 text-sm'>
                                <Link className='block' onClick={handleLogout}>Logout</Link>
                            </li>)}                   
                        </ul>
                    </div>)}                    
                </aside>
            </div>        
        </header>
    )
}

export default NavBar;
