
import React, { useEffect } from 'react'
import Banner from './Banner';
import TopSellers from './TopSellers';
import { useDispatch, useSelector } from 'react-redux';
import NewArrivals from './NewArrivals';
import { removeOrderDetails } from '../redux/orderSlice';

const HomePage = () => {

    let {allBooks,isLoading} = useSelector(store => store?.book);
    let dispatch = useDispatch();

    useEffect(() => {
        console.log("clean up done")
        dispatch(removeOrderDetails());
    }, []);

    return (
        <>
            <Banner />
            <TopSellers allBooks={allBooks} isLoading={isLoading}/>
            <NewArrivals allBooks={allBooks} isLoading={isLoading}/>
        </>
    )
}

export default HomePage;
