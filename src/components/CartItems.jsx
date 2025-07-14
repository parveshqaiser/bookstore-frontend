
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import emptyCart from "../assets/empty.svg";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';


const CartItems = () => {

    let cart = useSelector(store => store?.cart?.cartItems);

    let dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handleRemoveItems(id)
    {
        dispatch(removeFromCart(id))
    }

    function handleDecrease(id)
    {
        dispatch(decreaseQuantity(id))
    }

    function handleIncrease(id)
    {
        dispatch(increaseQuantity(id))
    }

    return (
    <main className="h-auto max-w-6xl my-20 mx-4 lg:mx-auto space-y-6">

        {cart && cart.length > 0 && (
            <section className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-xl font-bold text-gray-700">🛒 My Shopping Cart</h1>
                <button 
                    onClick={()=>dispatch(clearCart())}
                    className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-600 hover:bg-red-100 cursor-pointer hover:border-red-700 transition-all">
                    Clear Cart
                </button>
            </section>
        )}

        {cart && cart.length == 0 ? (
            <div className='text-center bg-[#F9FBFC] py-6'>
                <img src={emptyCart} className='w-60 mx-auto h-auto object-fill' alt="empty cart logo" />
                <h1 className='font-bold text-2xl mb-2'>Your Cart is Empty</h1>
                <p className='text-gray-500 text-lg mb-4'>Look's like you haven't made your choice yet.</p>
                <button className='px-4 py-2 rounded-md bg-violet-500 text-white'>
                    <Link to="/" >Back To Home Page</Link>
                </button>                    
            </div> 
               
        ) : cart.map((book, index) =>(
            <>
            <section key={book?._id} className="flex flex-col md:flex-row justify-between p-4 border-b-gray-600 rounded-md shadow-sm bg-[#F9FBFC]">
                <aside className="flex gap-4 w-full md:w-3/4">
                    <img src={book?.coverPic} alt="Book" className="w-20 h-auto object-cover rounded-md shadow-md" />
                    <div className="flex flex-col justify-between w-full">
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{book?.title}</p>
                            <p className="text-sm text-gray-600">By <span className="font-medium">{book?.author}</span></p>
                        </div>
                        <p className="text-sm text-gray-600">
                            Qty : &nbsp; 
                            <button 
                                disabled={book?.qty ==1}
                                onClick={()=>handleDecrease(book?._id)} 
                                className='px-3 py-1 border border-red-600 text-red-600 rounded-md'> - 
                            </button> 
                            <span className="font-semibold mx-3">{book?.qty}</span> 
                            <button 
                                disabled={book?.qty ==3}
                                onClick={()=>handleIncrease(book?._id)} 
                                className='px-3 py-1 border border-green-700 text-green-800 rounded-md'> + 
                            </button>
                        </p>
                    </div>
                </aside>

                <aside className='flex md:flex-col flex-row justify-between items-end p-2'>
                    <p className='text-base text-gray-600 font-normal'>&#8377; {book?.newPrice}</p>      
                    <div>
                        <MdDelete  onClick={()=> handleRemoveItems(book?._id)} size={24} className='text-red-600 cursor-pointer animate-bounce' />
                    </div>
                </aside>
            </section>
            </>
        ))}

        {cart && cart.length >0 && (
        <>
            <section className="flex flex-col md:flex-row justify-between md:items-center p-4 rounded-lg shadow-sm bg-[#F9FBFC]">
                <div>
                    <p className="text-base text-gray-700">Total Items: <span className="font-semibold">{cart.reduce((sum,book)=> sum + book?.qty,0)}</span></p>
                    <p className="text-sm text-gray-500">Shipping and Taxes calculated at checkout</p>
                </div>
                <p className="text-base font-semibold text-gray-600">Gross Total: &#8377; {cart.reduce((sum, book)=> sum + book?.newPrice,0)}</p>
            </section>

            <section className='text-center space-y-2'>
                <Link className='bg-purple-500 w-full block px-4 py-2 text-white rounded-md' to='/cart/checkout'>Checkout</Link>
                <p className='inline-block text-sm'>
                    <Link to="/" className='text-gray-600 hover:text-gray-800 transition' >
                        Or Continue Shopping <FaArrowRightLong className='inline ml-2' />
                    </Link>
                </p>
            </section>
        </>
        )}       
    </main>
    )
}

export default CartItems
