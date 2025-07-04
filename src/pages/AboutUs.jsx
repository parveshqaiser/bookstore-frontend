

import React, { useEffect } from 'react'

const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <main className='max-w-6xl my-20 p-2 lg:mx-auto mx-4 bg-[#F9FBFC]'>
            <section class="about-us p-8 max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-4 text-orange-400">Welcome to The Book Story Shop</h2>
                <p class="text-lg mb-4 font-serif ">
                    At <span className='underline'>"The Book Story Shop"</span>, we believe that every book holds a story waiting to be discovered. Our mission is to bring readers closer to their next favorite book, whether it’s a timeless classic or a modern bestseller. 
                </p>
                <p class="text-lg mb-4 font-mono">
                    We’re passionate about creating a simple, delightful, and inspiring experience for book lovers everywhere. From curated collections to personalized recommendations, we aim to make your reading journey seamless and enjoyable.
                </p>
                <p class="text-lg font-sans">
                    "The Book Story Shop" is proudly owned and managed by <strong>Parvesh Qaiser</strong>, whose love for books and technology brought this project to life. Thank you for being part of our story!
                </p>
            </section>
        </main>
      
    )
}

export default AboutUs;
