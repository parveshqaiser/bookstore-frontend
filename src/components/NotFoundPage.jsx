

import React from 'react'
import { Link } from 'react-router-dom'
import error from "../assets/error.jpg";

const NotFoundPage = () => {
  
    return(
        <div className="flex flex-col lg:flex-row items-center justify-between p-3 md:p-0 shadow-lg  border-gray-300 bg-[#F9FBFC] rounded-lg max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2 flex justify-center">
                <img
                    className="max-w-full h-auto object-cover rounded-md"
                    src={error}
                    alt="error message"
                />
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
                    Looks like you've found the doorway to the great nothing
                </h1>
                <p className="text-base text-gray-700">
                    The content you’re looking for doesn’t exist. Either it was
                    removed, or you mistyped the link.
                </p>
                <p className="text-base text-gray-700">
                    Sorry about that! Please visit our homepage to get where you
                    need to go.
                </p>
                <div className="flex justify-center lg:justify-start">
                    <Link className='border border-blue-500 p-2 rounded-md text-purple-500' to={"/"} >Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
