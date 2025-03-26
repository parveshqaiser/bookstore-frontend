import React, { useEffect, useMemo, useState, useCallback } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AddEditBookModal from "./AddEditBookModal";
import useGetAllBooks from "../shared/useGetAllBooks";
import { useSelector } from "react-redux";
import bookLoading from "../assets/bookLoading.gif";
import { Dialog } from 'primereact/dialog';
import AdminBookView from "./AdminBookView";

const ManageBooks = () => {
    
    let {isLoading} = useGetAllBooks();
    let allBooks = useSelector((store) => store?.book?.allBooks);

    const [visible , setVisible] = useState(false);  // add, update book
    const [searchText, setSearchText] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [show, setShow] = useState(false); // book view modal

    const tableData = useMemo(() => {
        if (!searchText?.trim()) return allBooks;
        let modify = allBooks?.filter((val) =>
            val.title.toLowerCase().includes(searchText.toLowerCase()) ||
            val.author.toLowerCase().includes(searchText.toLowerCase()) ||
            val.publisher.toLowerCase().includes(searchText.toLowerCase())
        );
        return modify;

    }, [allBooks, searchText]);

    const handleSearch = useCallback((e) => {
        setSearchText(e.target.value);
    }, []);

    if (isLoading) {
        return (
        <div className="mx-auto mt-10 w-52 text-center">
            <img src={bookLoading} className="w-16 h-16 rounded-lg mx-auto" />
            <p className="text-gray-600 mt-4">Loading... Please Wait.</p>
        </div>
        );
    }

    return (
    <>
        <AdminNavbar /> 

        <main className="mx-5 my-6 flex flex-col md:flex-row md:justify-between gap-2 items-center">
            <div className="w-full md:w-1/4">
                <input 
                    type="text"
                    onChange={handleSearch}
                    placeholder="Filter Books By Title, Author, Publisher"
                    className="w-full px-2 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                />
            </div>
            <button 
                onClick={()=> setVisible(true)}
                className="w-full md:w-auto flex items-center justify-center border border-green-600 p-2 rounded-md cursor-pointer hover:text-green-600 transition"
            >
                <FaPlus size={16} className="mr-1"/> 
                <span>Add New Book</span>
            </button>
        </main>

        <span className="text-gray-600 text-lg mx-5 bg-purple-300 p-2 rounded-lg my-1">Total Available Books : {allBooks?.length || 0}</span>
        <div className="mx-5">
            <DataTable 
                className="table-auto"  
                value={tableData} 
                paginator rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                tableStyle={{ minWidth: '50rem' }}
                tableClassName="custom-table"
                paginatorClassName="custom-pagination"
                emptyMessage={
                    <p className="text-red-500 text-md text-center">
                        No Book found. Add a new Book !
                    </p>
                }
            >
                <Column field="title" header="Title"></Column>
                <Column field="author" header="Author"></Column>               
                <Column field="publisher" header="Publisher"></Column> 
                <Column field="newPrice" header="Price ($)"></Column>
                <Column field="quantity" header="Qty"></Column>
                <Column header="Action" className="" body={(rowData)=>(
                    <div className="flex gap-4 justify-center">
                        <button className="p-2" title="View More" onClick={()=> {setShow(true), setSelectedBook(rowData)}}>
                            <HiDotsHorizontal className="text-xl text-gray-700 cursor-pointer" />
                        </button>  
                        <button className="p-2" title="Edit" onClick={()=>{setSelectedBook(rowData), setVisible(true), setIsEdit(true)}}>
                            <IoPencil className="text-xl text-green-700 cursor-pointer" />
                        </button>                          
                        <button className="p-2" title="Delete">
                            <MdDelete className="text-xl text-red-700  cursor-pointer animate-bounce"/>
                        </button>
                    </div>
                )}/>                   
            </DataTable>
        </div>

        <Dialog 
            header={isEdit ? "Update Book" :"Add New Book"} 
            visible={visible} 
            style={{ width: '75vw' }} 
            onHide={() => {setVisible(false), setIsEdit(false),setSelectedBook(null)}}
        
        >
            <AddEditBookModal selectedBook={selectedBook} isEdit={isEdit} setVisible={setVisible} />
        </Dialog>

        <Dialog
            header="Book View" 
            visible={show}
            style={{width:"70vw"}}
            onHide={() => {setShow(false),setSelectedBook(null)}}
        >
            <AdminBookView selectedBook={selectedBook}/>
        </Dialog>

    </>
    );
};

export default ManageBooks;