
import React,{useEffect, useState} from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import order from "../assets/order.jpg";
import pwd from "../assets/pwd.jpg";
import address from "../assets/address.jpg";
import profile from "../assets/user.svg";

const UserProfileLayout = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 767;
            setIsMobile(mobile);
      
            if (!mobile) {
                setShowSidebar(true);
            }
        };
      
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
        <main className="max-w-6xl lg:mx-auto mx-4 my-20">
            <div className="flex flex-col md:flex-row gap-4">
            {showSidebar && (
                <aside className={`md:w-64 w-full p-2 rounded shadow-sm h-fit sticky top-20 self-start`}>
                    <div className="mb-4 font-semibold text-lg">Profile</div>
                    <NavLink 
                        to="/user/profile/view"
                        end 
                        onClick={()=> isMobile && setShowSidebar(false)}
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
                        onClick={()=> isMobile && setShowSidebar(false)}
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
                        onClick={()=> isMobile && setShowSidebar(false)}
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
                        onClick={()=> isMobile && setShowSidebar(false)}
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
                </aside>)}
                
                {(!isMobile || !showSidebar) &&(
                    <section className="md:flex-1 p-2 rounded shadow-sm">
                        <Outlet />
                    </section>
                )}
            </div>

            <section className="p-2 rounded w-full">
                {isMobile &&  !showSidebar &&(
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="mb-4 text-purple-600 hover:underline"
                    >
                        ← Back to Profile Menu
                    </button>
                )}
            </section>
        </main>
        </>
    )
}

export default UserProfileLayout;
