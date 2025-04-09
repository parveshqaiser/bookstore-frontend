
import React from 'react'
import NavBar from './NavBar'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom';
// import { BsBoxFill } from "react-icons/bs";
// import { MdLocationOn } from "react-icons/md";
import order from "../assets/order.jpg";
import pwd from "../assets/pwd.jpg";
import address from "../assets/address.jpg";
import profile from "../assets/user.svg";


const UserProfile = () => {

    let {user} = useSelector(store => store?.user);
  
    return (
        <>
        <NavBar user={user}/>
        <main className="max-w-6xl mx-auto my-20">
            <div className="flex gap-4">
                <aside className="lg:w-64 p-2 rounded shadow-sm h-fit sticky top-20 self-start">
                    <div className="mb-4 font-semibold text-lg">Profile</div>

                    <NavLink 
                        to="/user/profile"
                        end 
                        className={({ isActive }) =>
                            `mb-2 block w-full p-2 cursor-pointer rounded transition-all duration-300 ${
                            isActive
                                ? "text-purple-700 bg-gradient-to-r from-purple-50 to bg-purple-200"
                                : "text-gray-500"
                            }`
                        }>
                            <img src={profile} className='w-8 inline-block' />
                            <span className='text-lg mx-2'>Overview</span>
                    </NavLink>

                    <NavLink
                        to="/user/profile/orders"
                        className={({ isActive }) =>
                            `mb-2 block w-full p-2 cursor-pointer rounded transition-all duration-300 ${
                            isActive
                                ? "text-purple-700 bg-gradient-to-r from-purple-50 to bg-purple-200"
                                : "text-gray-500"
                            }`
                        }
                        >
                            <img src={order} className='w-8 inline-block' />
                            <span className="text-lg mx-2">My Orders</span>
                    </NavLink>

                    <NavLink
                        to="/user/profile/address"
                        className={({ isActive }) =>
                            `mb-2 block w-full p-2 cursor-pointer rounded transition-all duration-300 ${
                            isActive
                                ? "text-purple-700 bg-gradient-to-r from-purple-50 to bg-purple-200"
                                : "text-gray-500"
                            }`
                        }
                        >
                            <img src={address} className='w-8 inline-block' />
                            <span className="text-lg mx-2">My Address</span>
                    </NavLink>

                    <NavLink
                        to="/user/profile/change-password"
                        className={({ isActive }) =>
                            `mb-2 block w-full p-2 cursor-pointer rounded transition-all duration-300 ${
                            isActive
                                ? "text-purple-700 bg-gradient-to-r from-purple-50 to bg-purple-200"
                                : "text-gray-500"
                            }`
                        }
                        >
                             <img src={pwd} className='w-8 inline-block' />
                            <span className="text-lg mx-2">Change Password</span>
                    </NavLink>

                    <div className="mt-6 text-red-500 cursor-pointer hover:underline">Sign Out</div>
                </aside>

                
                <section className="lg:flex-1 p-4 rounded shadow-sm">
                    <Outlet />
                </section>
            </div>
        </main>
        </>
    )
}

export default UserProfile
