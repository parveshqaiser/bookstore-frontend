
import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { BASE_URL } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addAdminData } from '../redux/adminSlice';

const AdminLogin = () => {

    const [inputValues, setInputValues] = useState({username : "", password:""});
    const [isDisable , setIsDisable] = useState(false);
    const [toggleIcons , setToggleIcons] = useState(false);

    let user = useSelector(store => store?.user?.user);
    let dispatch = useDispatch();

    const navigate = useNavigate();

     useEffect(()=>{
        if(user && user.role == "user")
        {
            navigate("/")
        }else {
            navigate("/admin/login")
        }
    },[])

    const handleSubmit = async()=>{

        let isSomeFieldEmpty = Object.values(inputValues).some(val => val.trim() =="");

        if(isSomeFieldEmpty){
            toast.error("All Inputs are required",{position:"top-center", duration:2000})
            return;
        }

        try {
            setIsDisable(true)
            let res = await axios.post(`${BASE_URL}/admin/login`, inputValues, {withCredentials:true});
            console.log(res.data);
            if(res.data.success)
            {
                toast.success(res.data.message, {duration:2000,position:"top-center"});
                setTimeout(() => {
                    navigate("/admin/dashboard");
                    dispatch(addAdminData(res.data.data));
                    setIsDisable(false)
                }, 1500);                
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            setIsDisable(false)
        }
    }

    return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-600'>
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
                <div className="flex items-center relative">
                    <input
                        type={toggleIcons ? "text" : "password"}
                        onChange={(e) =>
                            setInputValues({ ...inputValues, password: e.target.value.trim() || "" })
                        }
                        value={inputValues.password}
                        name="password"
                        placeholder="Password"
                        className="py-2 px-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/60 text-gray-600"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setToggleIcons(!toggleIcons)}
                    >
                        {toggleIcons ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                </div>             
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
            <div className='mt-2 text-center'>
                <Link to="/" className='text-sm underline' >Home</Link>
            </div>
        </div>
    </div>
    )
}

export default AdminLogin;
