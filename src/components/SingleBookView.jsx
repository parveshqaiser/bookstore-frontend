

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBook } from '../redux/bookSlice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const SingleBookView = () => {

    let {id} = useParams();
    let book = useSelector(store => store?.book?.singleBook);

    let [quantity , setQuantity] = useState(1);

    let dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getSingleBook(id))
    },[dispatch])

    function handleAddToCart()
    {
        let addBook = {
            ...book,
            perUnit : book?.newPrice,
            newPrice : book?.newPrice * quantity,
            qty : parseInt(quantity) || 1,
        };
        dispatch(addToCart(addBook));
        toast.success(`${book?.title} added to cart`)
    }


    return (
        <>
        <main className='h-auto max-w-6xl my-20 lg:mx-auto mx-4'>
            <section className='grid grid-cols-1 md:grid-cols-3 gap-6 border-b-rounded-lg shadow-lg p-6'>
                <div className="w-48 Wmx-auto">
                    <img
                        className="w-full object-fill rounded-lg shadow-md"
                        src={book?.coverPic}
                        alt="Book Cover"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{book?.title}</h1>
                    <h2 className="text-gray-600 mb-2">
                        By <span className="font-medium font-mono">{book?.author} </span>(author) | 
                        Publisher: <span className="font-medium">{book?.publisher}</span>
                    </h2>

                    <div className="text-lg text-gray-700 space-y-0.5 mb-2">
                        <p>
                            <span className="text-green-600 text-lg font-bold block">${book?.newPrice}</span>
                            <span className="line-through text-base text-red-500">${book?.oldPrice}</span>
                            <span className="text-gray-600 ml-2">
                                Save: ${book?.oldPrice - book?.newPrice} ({Math.round(((book?.oldPrice - book?.newPrice) / book?.oldPrice) * 100)}%)
                            </span>
                        </p>

                        <div><span className="">Category:</span> {book?.category}</div>
                        <div><span className="">Pages:</span> {book?.pages}</div>
                        <div>
                            <span className={`font-semibold ${book?.isAvailable ? "text-green-500" : "text-red-500"}`}>
                            {book?.isAvailable ? "Available" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="text-sm text-gray-600">
                            <p>Ships within <span className="font-bold">2-4 Business Days</span></p>
                            <p>Free Shipping in India and low cost Worldwide.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-2 md:mt-0 md:space-x-0 space-x-2">
                    <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <select 
                        className="w-48  focus:outline-none p-2 border border-gray-400 rounded-md" 
                        onChange={(e)=> setQuantity(e.target.value)}
                    >
                        {[1, 2, 3].map(qty => (
                            <option key={qty} value={qty}>{qty}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleAddToCart}
                        disabled={!book?.isAvailable}
                        className={`w-48  border border-purple-600 text-purple-600 py-2 rounded-md font-semibold transition-all  ${book?.isAvailable ? "cursor-pointer" : "line-through cursor-not-allowed"}`}
                    >
                        Add to Cart
                    </button>

                    <button
                        disabled={!book?.isAvailable}
                        className={`w-48 border border-green-800 text-green-700  py-2 rounded-md font-semibold transition-all  ${book?.isAvailable ? "cursor-pointer" : "line-through cursor-not-allowed"}`}
                    >
                        Buy Now
                    </button>
                </div>

            </section>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">About the Book</h3>
                <p className="text-gray-700 text-justify leading-relaxed">{book?.description}</p>
            </div>
        </main>
        </>
    )
}

export default SingleBookView
