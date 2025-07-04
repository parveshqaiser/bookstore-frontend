
import React from 'react'

const AdminBookView = ({selectedBook}) => {
    if (!selectedBook) return null;

    return (
    <main className="px-4 py-2 bg-[#F9FBFC] rounded-lg shadow-lg h-auto w-full flex flex-col md:flex-col lg:flex-row max-w-screen-lg mx-auto">
        <div className="lg:w-1/3 w-full flex justify-center lg:justify-start">
            <img 
                src={selectedBook?.coverPic} 
                alt='Book Cover Pic'
                className="w-48 h-60 md:w-48 md:h-60 md:object-center lg:w-full lg:h-96 rounded-lg shadow-md"
            />
        </div>

        <div className="lg:w-2/3 w-full md:pl-6 space-y-2 mt-4 lg:mt-0 text-left">
            <h2 className="text-xl font-semibold text-gray-800">{selectedBook?.title}</h2>
            <p className="text-lg text-gray-600 italic">by {selectedBook?.author}</p>
            <p className="text-md text-gray-500">Publisher: {selectedBook?.publisher}</p>
            <p className="text-md text-gray-500">Pages: {selectedBook?.pages}</p>
            <p className="text-md text-gray-500">Available Quantity: {selectedBook?.quantity}</p>
            <p className="text-md text-gray-500">Available In Languages: {selectedBook?.language}</p>
            <p className="text-md text-gray-500">Category / Genre: {selectedBook?.category}</p>
            
            <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-green-600"> ₹ {selectedBook?.newPrice}</span>
                {selectedBook?.oldPrice && (
                    <span className="text-md text-gray-600 line-through"> ₹ {selectedBook?.oldPrice}</span>
                )}
            </div>
    
            <p className="text-md text-gray-700 leading-relaxed">{selectedBook?.description}</p>
        </div>
    </main>
    );
}

export default AdminBookView;
