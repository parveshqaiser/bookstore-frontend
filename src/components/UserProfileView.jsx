
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getUserDetails, logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {FiShoppingBag, FiUser } from 'react-icons/fi';
import { FaUserEdit } from "react-icons/fa";

const UserProfileView = () => {

    let {user} = useSelector(store => store?.user);
    const [isDisabled, setIsDisabled] = useState(false);
    let phoneExp = new RegExp("^[6-9]\\d{9}$"); 

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name : {
            value : "",
            error : "",
        },
        number : {
            value : "",
            error : "",
        },
    });

    useEffect(()=>{
        setFormValues({
            name : {
                value  : user?.name,
                error :"",
            }, 
            number : {
                value  : user?.number || "",
                error :"",
            }
        })
    },[])

    function handleChange(e)
    {
        let {name , value} = e.target;

        let newValues = {...formValues};
        if (name == "name")
        {
            newValues[name] = {
                value : value && value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required" : ""
            }
        }

        if(name == "number"){
            newValues[name] = {
                value : value && value >= 6 ? parseInt(value) || "" :"",
                error : !value ? "Required" : (value >=0 && value <=5) ? "Mobile Number must start between 6-9 & must be 10 digits":"",
            }
        }
        setFormValues(newValues);
    }

    const handleUpdate =async ()=>{
        if(formValues.name.value?.trim() ==""){
            setFormValues({...formValues,
                name :{
                    ...formValues.name,
                    error: "required*"
                }
            });
            return;
        }

        if (!formValues.number.value || !phoneExp.test(formValues.number.value)){
            setFormValues({
                ...formValues,
                number : {
                    ...formValues.number,
                    error :!formValues.number.value ? "Required" :"Invalid Number",
                }
            });
            return;
        }

        let data = {
            name : formValues.name.value?.trim(),
            number : formValues.number.value,
        };

        try {
            setIsDisabled(true);
            let res = await axios.patch(BASE_URL + "/update/profile", data, {withCredentials : true});
            if(res.data.success){
                toast.success(res.data?.message, {duration:2000});
                dispatch(getUserDetails());
                setIsDisabled(false);
            }
        } catch (error) {
            setIsDisabled(false);
            if(error.status == 401 || error.status == 500){
                dispatch(logoutUser());
                navigate("/user/signin");                
            }
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return (
    <>
    <main className="space-y-6">
        <aside className="border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">Account Overview</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </aside>

        <aside className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <nav className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-100">
                <article className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Personal Info</h3>
                        <p className="text-sm text-gray-600">Your basic information</p>
                    </div>
                </article>
                <article className="space-y-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <p className="text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{user?.email || "john.doe@example.com"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">+91-{user?.number || "9000000"}</p>
                    </div>
                </article>
            </nav>

            <nav className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-100">
                <article className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <FiShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Account Stats</h3>
                        <p className="text-sm text-gray-600">Your activity summary</p>
                    </div>
                </article>
                <article className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">4</p>
                        <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">3</p>
                        <p className="text-sm text-gray-600">Addresses</p>
                    </div>
                     <div className="text-center">
                        <p className="text-xl font-bold text-green-600">30-05-2025</p>
                        <p className="text-sm text-gray-600">Last Order Placed</p>
                    </div>
                     <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">₹ 423</p>
                        <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                </article>
            </nav>
        </aside>

        <aside className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl">
            <article className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                    <FaUserEdit className="w-5 h-5 text-white" />
                </div>                
                <h3 className="font-semibold text-gray-900">Update Info</h3>
            </article>

            <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                        name="name"
                        type="text"
                        autoComplete='off'
                        value={formValues.name.value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-600"
                    />
                    <span className='text-sm text-red-500'>{formValues.name.error}</span>
                </div>
        
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Mobile Number</label>
                    <input 
                        name="number"
                        type="text"
                        autoComplete='off'
                        maxLength={10}
                        value={formValues.number.value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-orange-400 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-600"
                    />
                    <span className='text-sm text-red-500'>{formValues.number.error}</span>
                </div>
        
                <div className="">
                    {isDisabled ?  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
                    <button 
                        onClick={handleUpdate}
                        className={`px-4 py-2 border border-orange-600 text-yellow-500 rounded-md transition text-sm font-medium cursor-pointer hover:bg-white hover:text-orange-400`}
                    > 
                        Update Profile
                    </button>
                    }
                </div>
            </article>            
        </aside>
    </main>
    </>
    )
}

export default UserProfileView;
                       