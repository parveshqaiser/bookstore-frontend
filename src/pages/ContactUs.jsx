

import React, { useEffect, useState } from 'react'
import { domSanitizer } from '../utils/domSanitize';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

let initialFormValues = {
    name : {
        value : "",
        error: "",
    },
    email : {
        value : "",
        error: "",
    },
    message : {
        value : "",
        error: "",
    },
};

const ContactUs = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    const [formValues , setFormValues] = useState({
        name : {
            value : "",
            error: "",
        },
        email : {
            value : "",
            error: "",
        },
        message : {
            value : "",
            error: "",
        },
    });

    function handleChange(e)
    {
        let {name ,value} = e.target;

        value = domSanitizer(value); 

        let newValues = {...formValues};
        
        newValues[name] ={
            value : value,
            error : !value ? "Required" : ""
        };

        setFormValues(newValues);
    }

    const handleSubmit = async()=>{

        let isEmpty = Object.values(formValues).some(val => val.value?.trim() =="");

		if(isEmpty){
			return toast.error("All Fields are required");
		}

        let data = {
            name : formValues.name.value?.trim(),
            email : formValues.email.value?.trim(),
            message : formValues.message.value?.trim()
        }

        try {
            let res = await axios.post(BASE_URL + "/contact/message",data);

            if(res.data.success){
                toast.success(res.data.message,{duration:2500});
				setFormValues(initialFormValues);
            }
        } catch (error) {
			toast.error(error?.response?.data?.message || "Server Issue", {duration:2000})
        }
    }

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
                    onChange={handleChange}
                    value={formValues.name.value}
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span className='text-sm text-red-500'>{formValues.name.error}</span>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formValues.email.value}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span className='text-sm text-red-500'>{formValues.email.error}</span>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    name="message"
                    onChange={handleChange}
                    value={formValues.message.value}
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                ></textarea>
                <span className='text-sm text-red-500'>{formValues.message.error}</span>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-purple-400 cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"
            >
                Send Message
            </button>
        </form>
    </section>

    )
}

export default ContactUs
