


import footerLogo from "../assets/footer-logo.png";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
    <footer className="bg-gray-900 text-white py-12 px-4 max-w-7xl mx-auto">

        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
                <img src={footerLogo} alt="Logo" className="h-12" />
                <p className="text-gray-400 text-sm">
                    Empowering your digital journey with innovative solutions and exceptional service.
                </p>
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/" target="_self" className="text-gray-400 hover:text-blue-600 transition">
                        <FaFacebook size={20} />
                    </a>
                    <a href="https://x.com/home" target="_self" className="text-gray-400 hover:text-black transition">
                        <FaTwitter size={20} />
                    </a>
                    <a href="https://www.instagram.com/" target="_self" className="text-gray-400 hover:text-pink-600 transition">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.linkedin.com" target="_self" className="text-gray-400 hover:text-blue-400 transition">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                    <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                    <li><Link to="/services" className="text-gray-400 hover:text-white transition">Services</Link></li>
                    <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start space-x-3">
                        <FaMapMarkerAlt className="mt-1 hover:text-green-500" />
                        <span>The Developers Parardise, #301</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <FaEnvelope />
                        <span>thebookstory@support.com</span>
                    </li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                    Subscribe to our newsletter for the latest updates and offers.
                </p>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="px-4 py-2 w-full rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>

        <section className="max-w-6xl mx-auto border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} The BookStore. <span className="underline hover:text-blue-500"> Developed By Parvesh</span>
            </p>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white transition text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white transition text-sm">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white transition text-sm">Cookies</a>
            </div>
        </section>
    </footer>
);
};

export default Footer;