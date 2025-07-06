
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const AllBooks = () => {

    let dispatch = useDispatch();
    let {isLoading,allBooks} = useSelector(store=> store?.book);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    if(isLoading)
    {
        return <div className='text-center'>
            <h2 className='text-lg'>Loading... Please Wait</h2>
        </div>
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

    return (
    <main className='max-w-6xl my-20 lg:mx-auto mx-4'>
        <section className="flex flex-wrap justify-between gap-4">
            {allBooks?.length == 0 ? <p className='text-center text-lg text-purple-400'>No Such Book Found</p> : 
                allBooks?.map((book, index) => (
                <asidev key={index} className="flex w-[350px] items-center p-3 gap-y-5 shadow-md hover:shadow-xl rounded-lg bg-[#F9FBFC] transition-all duration-300 transform hover:-translate-y-0.5">
                    
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
                </asidev>
            ))}
        </section>
    </main>
    )
}

export default AllBooks;
