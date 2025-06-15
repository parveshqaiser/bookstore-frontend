

import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useSelector } from 'react-redux';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Body = () => {
    
    let {user} = useSelector(store => store?.user);

    // console.log("body called", user);

    // useEffect(()=>{
    //     console.log("render hook book")
    // },[])

    return (
        <>
            <NavBar user={user} />
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Body;
