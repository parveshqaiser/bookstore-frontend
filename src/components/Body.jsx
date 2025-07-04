

import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { getAllBooksList } from '../redux/bookSlice';

const Body = () => {
    
    let dispatch = useDispatch();
    let {user} = useSelector(store => store?.user);
    let {isFetched} = useSelector(store=> store?.book);


    useEffect(()=>{
        if(!isFetched){
            console.log("use effect from body called")
            dispatch(getAllBooksList())
        }        
    },[isFetched]);


    return (
        <>
            <NavBar user={user} />
            <main className='h-[100%]'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Body;
