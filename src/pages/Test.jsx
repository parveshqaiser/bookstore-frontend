

import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* Main Footer Content */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
                <div className="lg:col-span-1">
                    <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-xl">BS</span>
                    </div>
                    <span className="text-xl font-bold">Book Story Shop</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                    Discover amazing stories and connect with fellow book lovers in our cozy literary community.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>123 Literary Lane, Book City</span>
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="mr-2" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        <span>hello@bookstoryshop.com</span>
                    </div>
                    </div>
                </div>

            {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h3>
                    <ul className="space-y-3">
                    <li>
                        <Link
                        href="/"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        Home
                        </Link>
                    </li>
                    <li>
                        <a
                        href="#services"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        Services
                        </a>
                    </li>
                    <li>
                        <Link
                        href="/about"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        About Us
                        </Link>
                    </li>
                    <li>
                        <a
                        href="#contact"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        Contact
                        </a>
                    </li>
                    </ul>
                </div>

            {/* Legal Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Legal</h3>
                    <ul className="space-y-3">
                    <li>
                        <a
                        href="#privacy"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                        href="#terms"
                        className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                        >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        Terms of Service
                        </a>
                    </li>
                    </ul>
                </div>

            {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-300">Stay Updated</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Subscribe to our newsletter for the latest updates, news, and exclusive offers!
                    </p>
                    <div className="space-y-3">
                    <div className="relative">
                        <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                        Subscribe Now
                    </button>
                    </div>
                </div>
            </main>

            <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">© 2025 The Book Story Shop. All rights reserved.</div>

                {/* Social Media Links */}
                <div className="flex gap-4">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
                >
                    <FaFacebook size={18} />
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
                >
                    <FaTwitter size={18} />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
                >
                    <FaInstagram size={18} />
                </a>
                </div>
            </div>
            </div>
        </section>
    </footer>
)
}

export default Footer
