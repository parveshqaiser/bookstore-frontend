

import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../pages/Footer';
import { Outlet } from 'react-router-dom';
import { getAllBooksList } from '../redux/bookSlice';

const Body = () => {
    
    let dispatch = useDispatch();
    let {user} = useSelector(store => store?.user);
    let {isFetched} = useSelector(store=> store?.book);

    useEffect(()=>{
        if(!isFetched){
            dispatch(getAllBooksList())
        }        
    },[isFetched]);

     useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
