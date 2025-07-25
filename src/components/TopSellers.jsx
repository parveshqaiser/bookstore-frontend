
import React, { useEffect, useState } from 'react';
import { res } from '../utils/constants';
import {Link } from "react-router-dom";
import { categoryList } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const TopSellers = ({allBooks, isLoading}) => {

    const [tableData, setTableData] = useState(allBooks);
    let dispatch = useDispatch();

    function handleChange(e)
    {
        let cat = e.target.value;
        const filteredBooks = cat == "Choose A Genre" ? allBooks : allBooks.filter(val => val.category.toLowerCase() == cat.toLowerCase());
        setTableData(filteredBooks);
    }

    function handleAddToCart(book)
    {
        let addBook = {
            ...book,
            perUnit : book?.newPrice,
            qty :1,
        };
        dispatch(addToCart(addBook));
        toast.success(`${book?.title} added to cart`)
    }

    if(isLoading)
    {
        return <div className='text-center'>
            <h2 className='text-lg'>Loading... Please Wait</h2>
        </div>
    }

    return (
       <main className='max-w-6xl my-20 lg:mx-auto mx-4'>
            <h1 className='text-lg text-gray-800'>Top Sellers</h1>
            <div className='my-2'>
                <select onChange={handleChange} className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                  <option value="Choose A Genre">Choose A Genre</option>
                    {categoryList.map((val)=>(
                        <option key={val} label={val} value={val}>{val}</option>
                    ))}
                </select>
            </div>
            
            <section className="flex flex-wrap justify-between gap-4">
                {tableData?.length == 0 ? <p className='text-center text-lg text-purple-400'>No Such Book Found</p> : 
                tableData?.slice(0,3).map((book, index) => (
                    <nav key={index} className="flex w-[350px] items-center p-3 shadow-lg hover:shadow-xl rounded-lg bg-[#F9FBFC]">
                        
                        <div className="w-[115px] h-44 flex-shrink-0 border border-gray-300 p-1 transition-transform transform hover:scale-[1.1] hover:cursor-pointer">
                            <Link to={`/book/view/${book?._id}`}>
                            <img 
                                src={book.coverPic} 
                                alt={book.title} 
                                className="w-full h-full object-cover rounded-md"
                                title='View More'
                            />
                            </Link>
                        </div>

                        <div className="ml-4">
                            <h2 className="text-base font-semibold text-gray-800 mb-2">{book.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">{book?.description.length > 70 ? `${book.description.slice(0, 70)}...` : book?.description}</p>
                            <p className="text-md font-medium text-purple-500 mb-2">
                                <span className="text-green-600 font-semibold mr-2">₹ {book?.newPrice}</span>
                                <span className="text-gray-500 line-through text-sm">₹ {book?.oldPrice}</span>                           
                            </p>
                            <button
                                onClick={()=>handleAddToCart(book)}
                                className="border border-purple-500 text-purple-700 px-4 py-1 rounded-md hover:cursor-pointer transition">
                                Add To Cart
                            </button>
                        </div>
                    </nav>
                ))}
            </section>
       </main>
    )
}

export default TopSellers
