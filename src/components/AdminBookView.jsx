
import React from 'react'

const AdminBookView = ({selectedBook}) => {
    if (!selectedBook) return null;

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg h-auto w-full flex flex-col md:flex-row">
            
            <div className="md:w-1/3 w-full flex justify-center md:justify-start">
                <img 
                    src={selectedBook?.coverPic} 
                    alt='Book Cover Pic'
                    className="w-48 h-64 object-cover rounded-lg shadow-md"
                />
            </div>

          
            <div className="md:w-2/3 w-full md:pl-6 space-y-2 mt-4 md:mt-0 text-left md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">{selectedBook?.title}</h2>
                <p className="text-lg text-gray-600 italic">by {selectedBook?.author}</p>
                <p className="text-md text-gray-500">Publisher: {selectedBook?.publisher}</p>
                <p className="text-md text-gray-500">Pages: {selectedBook?.pages}</p>
                <p className="text-md text-gray-500">Available Quantity: {selectedBook?.quantity}</p>
                
                <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-green-600">${selectedBook?.newPrice}</span>
                    {selectedBook?.oldPrice && (
                        <span className="text-md text-gray-600 line-through">${selectedBook?.oldPrice}</span>
                    )}
                </div>

                <p className="text-md text-gray-700 leading-relaxed">Description :{selectedBook?.description}</p>
            </div>
        </div>
    );
}

export default AdminBookView;
