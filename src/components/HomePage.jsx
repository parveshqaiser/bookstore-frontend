
import React, { useEffect } from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import TopSellers from './TopSellers';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import NewArrivals from './NewArrivals';

const HomePage = () => {

    let {allBooks,isLoading} = useSelector(store => store?.book);

    return (
        <>
            <Banner />
            <TopSellers allBooks={allBooks} isLoading={isLoading}/>
            <NewArrivals allBooks={allBooks} isLoading={isLoading}/>
        </>
    )
}

export default HomePage;
