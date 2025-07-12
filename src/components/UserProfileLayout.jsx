
import {useEffect, useState} from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';
import order from "../assets/order.jpg";
import pwd from "../assets/pwd.jpg";
import address from "../assets/address.jpg";
import profile from "../assets/user.svg";

import { useLocation } from 'react-router-dom';
// import { User, ShoppingBag, MapPin, Lock, LogOut, Menu, ArrowLeft } from "lucide-react"
import { FiUser, FiShoppingBag, FiMapPin, FiLock, FiLogOut, FiMenu, FiArrowLeft } from "react-icons/fi";

const navigationItems = [
    {
        href:"/user/profile/view",
        label: "Overview",
        icon: FiUser,
    },
    {
        href: "/user/profile/orders",
        label: "My Orders",
        icon: FiShoppingBag,
    },
    {
        href: "/user/profile/address",
        label: "My Address",
        icon: FiMapPin,
    },
    {
        href: "/user/profile/change-password",
        label: "Change Password",
        icon: FiLock,
    },
];

const UserProfileLayout = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();

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

    const handleNavClick = () => {
        if (isMobile) {
            setShowSidebar(false)
        }
    }


    return (
    <main className="max-w-6xl lg:mx-auto mx-4 mt-20 mb-40">
        <div className="rounded-xl shadow-sm border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row min-h-[600px]">
            {showSidebar && (
                <aside className="md:w-72 w-full bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-100">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <FiUser className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Profile</h2>
                                    <p className="text-sm text-gray-500">Manage your account</p>
                                </div>
                            </div>
                        {isMobile && (
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FiArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                        )}
                        </div>

                        <nav className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;
                            return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                onClick={handleNavClick}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive
                                    ? "bg-gradient-to-r from-violet-400 to-purple-500 text-white shadow-lg shadow-purple-500/25"
                                    : "text-gray-600 hover:bg-white hover:text-purple-600 hover:shadow-md"
                                }`}
                            >
                                <Icon
                                className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-purple-500"}`}
                                />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                            )
                        })}
                        </nav>
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 w-full group">
                                <FiLogOut className="w-5 h-5" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {(!isMobile || !showSidebar) &&(
                <section className="md:flex-1 shadow-sm p-6 md:p-8">
                    <Outlet />
                </section>
            )}
            <section className="">
                {isMobile &&  !showSidebar &&(
                    <button
                        onClick={() => setShowSidebar(true)}
                       className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                        <FiMenu className="w-5 h-5" />
                        <span>Profile Menu</span>
                    </button>
                )}
            </section>
            </div>
        </div>
    </main>
    )
}

export default UserProfileLayout;
