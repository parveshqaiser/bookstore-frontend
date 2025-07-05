

import React, {useEffect, useState } from 'react';
import { HiMiniBars4 } from "react-icons/hi2";
import { FaCartPlus } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import {Link} from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast  from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import Fuse from 'fuse.js';
import cart from "../assets/cartsvg.svg";

const NavBar = ({user}) => {

    let {cartItems} = useSelector(store => store?.cart);
    
    let {allBooks} = useSelector(store => store?.book);
    let [toggle, setToggle] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [keyText, setKeyText] = useState("");
    const [results, setResults] = useState([]);

    const options = {
        keys: ["title", "author"],
        threshold: 0.3,
    };

    let fuse = new Fuse(allBooks, options);

    const handleLogout = async ()=>{

        try {
            let res = await axios.post(BASE_URL + "/user/logout",{}, {withCredentials:true});
            if(res.data.success)
            {
                toast.success(res?.data?.message, {duration:2000});
                dispatch(logoutUser());
                setTimeout(()=>{
                    navigate("/user/signin");
                },1000)                
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    function handleChange(e)
    {
        let value = e.target.value;
        setKeyText(value);
        if(value?.trim() == ""){
            setResults([])
        }else {
            const res = fuse.search(value).map((r) => r.item);
            setResults(res);
        }      
    }

    return (
    <>
    <header className="max-w-6xl mx-auto flex md:flex-row items-center justify-between fixed top-0 left-0 right-0  bg-white/50 backdrop-blur-sm shadow-md p-3 z-20">      
        <div className="flex items-center gap-3">
            <Link to="/">
                <HiMiniBars4 size={26} className="text-purple-500 cursor-pointer hover:text-purple-600 transition duration-200" />
            </Link>
            <div className="">
                <input
                    type="text"
                    value={keyText}
                    onChange={handleChange}
                    placeholder="What are you looking for?"
                    className="w-auto px-2 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-500"
                />
            </div>
        </div>

        <div className="flex justify-between items-center gap-x-4">
            <span className='text-[14px]'>{user?.name || ""}</span>
            <aside className='flex gap-x-1 items-center'>
                <Link to="/cart/items">                   
                    {/* <FaCartPlus size={24} className='hover:text-purple-700' title='Cart' /> */}
                    <img src={cart} className='w-[26px] h-[26px]' />
                </Link>
                <span>{cartItems && cartItems.length || 0}</span>
            </aside>

            <aside  className='relative cursor-pointer' onClick={()=>setToggle(!toggle)}>
                <IoPersonCircle size={24} className={`${user?.name ? "text-green-500" : "text-red-600"}`} />
                {toggle &&(
                <div className='absolute right-0 top-[50px] w-48 bg-gray-100 shadow-lg rounded-md'>
                    <ul className='py-2'>                  
                        {!user &&<li className='hover:bg-gray-200 p-2 text-sm'>
                            <Link className='block' to="/admin/login">Admin Login</Link>
                        </li>}
                        {!user && (<li className='hover:bg-gray-200 p-2 text-sm'>
                            <Link className='block' to="/user/signin">User Login</Link>
                        </li>)}
                        {user &&(<li className='hover:bg-gray-200 p-2 text-sm'>
                            <Link className='block' to="/user/profile">User Profile</Link>
                        </li>)}
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

    {keyText && results.length > 0 && (
    <nav className='max-w-6xl mx-auto z-10 relative'>
        <div className="absolute top-full md:w-[400px] w-[300px] left-0 bg-white">
            <ul className="shadow-md rounded-md max-h-60 overflow-y-auto divide-y divide-gray-200">
                {results.map((book, index) => (
                <Link to={`/book/view/${book?._id}`} onClick={()=> setKeyText("")}>
                    <li key={book?._id} className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex justify-between">
                        <div>
                            <p className="font-medium text-gray-800">{book.title}</p>
                            <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                        <div className='w-8 h-auto'>
                            <img  
                                src={book.coverPic} 
                                alt={book.title} 
                                className="w-full object-cover rounded-md"
                            />
                        </div>
                    </li>
                </Link>
                ))}
            </ul>
        </div>
    </nav>
    )}
    </>
    )
}

export default NavBar;
