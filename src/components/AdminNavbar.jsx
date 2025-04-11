
import React from 'react';
import logo from "../assets/book-logo.png";
import avatar from "../assets/avatar.png";
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';
import { BASE_URL } from '../utils/api.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {

    let navigate = useNavigate();

    async function handleLogout()
    {
        try {
            let res = await axios.post(BASE_URL + "/admin/logout", {}, {withCredentials:true});
            if(res.data.success);
            {
                toast.success("Log out success",{duration: 2000,position: 'top-center'});
                setTimeout(()=>{
                    navigate("/");
                },2000); 
            }    
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            console.log("** ", error);
        }
    }

    return (
    <main className='max-w-7xl mx-auto'>
        <nav className='flex justify-between py-2 px-6 bg-gradient-to-r from-blue-200 via-purple-300 to-violet-400 shadow-sm'>
            <div className='w-10 h-10'>
                <img src={logo} className='rounded-lg' alt="book-logo" />
            </div>
            <div className='flex gap-4 items-center'>
                <span className='font-semibold text-sm text-gray-700 hover:text-white transition duration-300'>Admin</span> 
                <img src={avatar} alt="avatar" className='h-10 w-10 rounded-full border-2 border-violet-500 shadow-md' />
                <span className='cursor-pointer text-gray-700 hover:text-violet-600 transition duration-300' onClick={handleLogout}>
                    <FiLogOut size={20}  title='Logout'/>
                </span>
            </div>
        </nav>
    </main>
    )
}

export default AdminNavbar;
