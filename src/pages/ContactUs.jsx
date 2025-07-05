

import React, { useEffect } from 'react'

const ContactUs = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
    <section className="max-w-4xl mx-auto my-20 px-6 py-12 bg-[#F9FBFC] rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">How Can We Help You?</h2>
        <p className="text-center text-gray-700 mb-10">
            We’re here to assist you with any questions, orders, or feedback you may have.
            Reach us directly at <a href="mailto:thebookstory@support.com" className="text-purple-700 font-semibold underline">thebookstory@support.com </a> 
            or use the form below — we’ll get back to you as soon as possible!
        </p>

        <form className="space-y-6 max-w-2xl mx-auto" onSubmit={(e)=> e.preventDefault()}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-purple-400 cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
            >
                Send Message
            </button>
        </form>
    </section>

    )
}

export default ContactUs
