
import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';
import { Carousel } from 'primereact/carousel';

const NewArrivals = ({allBooks, isLoading}) => {
  
    const [tableData, setTableData] = useState(allBooks);
    let dispatch = useDispatch();

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

    function bookCarousel(book)
    {
        return(
            <div className="">
                <div className="flex gap-x-1 w-[350px] items-center p-3 shadow-lg hover:shadow-xl rounded-lg bg-white">
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
                        <p className="text-sm text-gray-600 mb-2">
                            {book?.description.length > 70 ? `${book.description?.slice(0, 70)}...` : book?.description}
                        </p>
                        <p className="text-md font-medium text-purple-500 mb-2">
                            <span className="text-green-600 font-semibold mr-2">$ {book?.newPrice}</span>
                            <span className="text-gray-500 line-through text-sm">$ {book?.oldPrice}</span>                                                   
                        </p>
                        <button 
                            onClick={() => handleAddToCart(book)}
                            className="border border-purple-500 text-purple-700 px-4 py-1 rounded-md hover:cursor-pointer transition"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <main className='max-w-6xl my-20 lg:mx-auto mx-4'>
            <h1 className='text-lg text-gray-800 my-5'>New Arrivals</h1>
            
            <Carousel 
                value={tableData}
                itemTemplate={bookCarousel}
                numVisible={3}
                numScroll={1}
                circular
                showIndicators={false}
                // autoplayInterval={2000}
                responsiveOptions={[
                    {
                        breakpoint: '1024px',
                        numVisible: 3,
                        numScroll: 1
                    },
                    {
                        breakpoint: '768px',
                        numVisible: 2,
                        numScroll: 1
                    },
                    {
                        breakpoint: '560px',
                        numVisible: 1,
                        numScroll: 1
                    }
                ]}
            />

            <div className='mt-10 text-center'>
                <Link to="/all/books" className='px-4 py-2 rounded-md bg-violet-500 text-white'>View All</Link>
            </div>
           
        </main>
    )
}

export default NewArrivals;
