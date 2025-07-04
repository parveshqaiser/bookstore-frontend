

import React, { useEffect } from 'react'

const Services = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
    <section className="p-8 max-w-6xl my-20 mx-auto text-center bg-[#F9FBFC] rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>

        <p className="text-lg mb-8 text-gray-700">
            At "The Book Story Shop", we offer a range of services designed to make your reading experience smooth, personalized, and enjoyable.
        </p>

        <nav className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
                title: 'Vast Book Collection',
                desc: 'Discover thousands of books across genres — from fiction and non-fiction to self-help and academic reads.'
            },
            {
                title: 'Personalized Recommendations',
                desc: 'Get book suggestions tailored to your reading history and preferences, so you always find your next great read.'
            },
            {
                title: 'Easy Online Ordering',
                desc: 'Seamlessly browse, add to cart, and order your favorite books with a secure and hassle-free checkout process.'
            },
            {
                title: 'Community Reviews',
                desc: 'Read reviews and ratings from other readers to help you choose books that truly resonate with you.'
            },
            {
                title: 'Wishlist & Save for Later',
                desc: 'Save books to your wishlist and never lose track of titles you want to read in the future.'
            },
            {
                title: 'Customer Support',
                desc: 'Our team is here to help with any questions or issues. Your reading journey is our priority.'
            },
            ].map((service, index) => (
            <div
                key={index}
                className="service-card p-6 rounded-lg shadow bg-gradient-to-l from-purple-100 to-pink-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
            </div>
            ))}
        </nav>

    </section>
    )
}

export default Services
