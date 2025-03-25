

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAllBooks } from '../redux/bookSlice';

const useGetAllBooks = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let [isLoading , setIsLoading] = useState(false);

    useEffect(()=>{
        getData();
    },[])

    async function getData()
    {
        console.log("from custom hook")
        setIsLoading(true);
        try {
            let res = await axios.get(BASE_URL + "/getAllBooks",{withCredentials: true});
            if(res?.data?.success)
            {
                setIsLoading(false)
                dispatch(addAllBooks(res.data.data || []))
            }    
        } catch (error) {
            console.log("error ", error);
            if(error.status == 401){
                navigate("/")
            }          
        }       
    }

    return {isLoading}
}

export default useGetAllBooks;
