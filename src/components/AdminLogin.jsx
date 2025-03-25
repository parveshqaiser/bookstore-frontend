
import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {

    const [inputValues, setInputValues] = useState({username : "", password:""});
    const [isDisable , setIsDisable] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async()=>{

        let allValuesPresent = Object.values(inputValues).every(val => val.trim() =="");

        if(allValuesPresent){
            toast.error("All Inputs are required",{position:"top-center", duration:2000})
            return;
        }

        try {
            setIsDisable(true)
            let res = await axios.post(`${BASE_URL}/admin/login`, inputValues, {withCredentials:true});
            if(res.data.success)
            {
                toast.success(res.data.message, {duration:2000,position:"top-center"});
                setTimeout(() => {
                    navigate("/admin/dashboard");
                    setIsDisable(false)
                }, 1500);                
            }
        } catch (error) {
            console.log("error ", error.message);
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            setIsDisable(false)
        }
    }


    return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-600'>
        <Toaster />
        <div className='w-96 p-4 rounded-lg shadow-2xl'>
            <img src={logo} className='w-12 h-12 mx-auto'/>
            <h2 className='font-mono my-2 text-center text-white font-bold text-lg'>Admin Login</h2>
            <div className='mb-4'>
                <input 
                    type='text'
                    name='username'
                    onChange={(e)=>setInputValues({...inputValues, username : e.target.value.trim() || ''})}
                    value={inputValues.username}
                    placeholder='Username'
                    className="py-2 px-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/60 text-gray-600"
                />
            </div>
            <div className='mb-4'>
                <input 
                    type='text'  
                    onChange={(e)=>setInputValues({...inputValues, password : e.target.value.trim() || ''})}
                    value={inputValues.password}
                    name='password'
                    placeholder='Password'
                    className="py-2 px-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/60 text-gray-600"
                />
            </div>
            <div>
                <button 
                    disabled={isDisable}
                    onClick={handleSubmit}
                    className={`bg-violet-500 py-2 rounded-lg hover:text-white w-full ${isDisable ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {isDisable ? "Wait Login In..." : "Login"}
                </button>
            </div>
        </div>
    </div>
    )
}

export default AdminLogin;
