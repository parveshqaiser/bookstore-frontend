
import React, { useEffect } from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import NewArrivals from './NewArrivals';

const HomePage = () => {

    let user = useSelector(store => store?.user?.user);
    let {allBooks,isLoading} = useSelector(store => store?.book);

    return (
        <>
            <NavBar user={user}/>
            <main className='min-h-screen max-w-6xl my-20 lg:mx-auto mx-4'>
                <Banner />
                <TopSellers allBooks={allBooks} isLoading={isLoading}/>
                <NewArrivals allBooks={allBooks} isLoading={isLoading}/>
            </main>

            <footer className='max-w-6xl lg:mx-auto mx-4 bg-purple-200 text-black p-6 mb-1 rounded-sm'>
                <Footer />
            </footer>
        </>
    )
}

export default HomePage;
