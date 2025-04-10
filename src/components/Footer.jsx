import React from 'react'
import footerLogo  from "../assets/footer-logo.png";
import {Link} from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
    <footer className="max-w-6xl lg:mx-auto mx-4 bg-purple-200 text-black p-6 mb-1 rounded-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="md:w-1/2 w-full">
                <img src={footerLogo} alt="Logo" className="mb-3 w-16" />
                <ul className="flex flex-col md:flex-row md:gap-4 gap-2">
                    <li><Link to="/home" className="hover:text-primary">Home</Link></li>
                    <li><a href="#services" className="hover:text-primary">Services</a></li>
                    <li><a href="#about" className="hover:text-primary">About Us</a></li>
                    <li><a href="#contact" className="hover:text-primary">Contact</a></li>
                </ul>
            </div>

            <div className="md:w-1/2 w-full">
                <p className="mb-4">
                    Subscribe to our newsletter to receive the latest updates, news, and offers!
                </p>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-l-md text-black bg-white focus:outline-none"
                    />
                    <button className="bg-purple-400 px-6 py-2 rounded-r-md hover:bg-primary-dark hover:cursor-pointer">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>

        <div className="container flex flex-col md:flex-row justify-between items-center mt-5 border-t border-gray-700 pt-6">
        
            <ul className="flex gap-6 mb-4 md:mb-0">
                <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
            </ul>

            <div className="flex gap-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    <FaFacebook size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                    <FaTwitter size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
                    <FaInstagram size={24} />
                </a>
            </div>
        </div>
    </footer>
    )
}

export default Footer