import React, { useEffect, useMemo, useState, useCallback } from "react";
import AdminNavbar from "./AdminNavbar";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import AddEditBookModal from "./AddEditBookModal";
import { useDispatch, useSelector } from "react-redux";
import bookLoading from "../assets/bookLoading.gif";
import { Dialog } from 'primereact/dialog';
import AdminBookView from "./AdminBookView";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { getAllBooksList } from "../redux/bookSlice";
import { Link, useNavigate } from "react-router-dom";

const ManageBooks = () => {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllBooksList());
    },[dispatch]);

    let {allBooks,isLoading , error} = useSelector((store) => store?.book);

    useEffect(() => {
        if (error?.error === 401) {
            navigate("/");
        }
    },[error, navigate]);


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

    const handleDeleteBook = async(id)=>{
        try {
            let res = await axios.delete(BASE_URL + `/deleteBook/${id}`, {withCredentials:true});
            if(res.data.success)
            {
                dispatch(getAllBooksList());
                toast.success(`${res.data?.message}`, {position: "top-center", duration : 2500})
            }
        } catch (error) {
            console.log("error ", error);
            toast.error(`${error?.message}`, {position: "top-center", duration : 2500})
        }       
    }

    const quantityTemplate = (rowData) => {
        let color ;
       if(rowData.quantity > 3 && rowData.quantity <7)
       {
            color = "bg-yellow-200"
       }else if(rowData.quantity <3){
            color = "bg-red-300"
       }else {
        color = ""
       }

        return (
            <span
                className={` px-3 py-2 rounded-md ${color}`}
            >
                {rowData?.quantity}
            </span>
        );
    };

    return (
    <>
        <AdminNavbar /> 
        <Toaster />
        <main className="mx-auto p-4 max-w-6xl">
            <Link to="/admin/dashboard">
                <button className='px-2 py-2 border text-sm border-blue-600 text-violet-600 rounded-md cursor-pointer'>⬅️ Go Back</button>
            </Link> 
            <div className="my-3 flex flex-col md:flex-row md:justify-between gap-2 items-center">
                <div className="md:w-1/3 lg:w-1/3 w-full">
                    <input 
                        type="text"
                        onChange={handleSearch}
                        placeholder="Filter Books By Title, Author, Publisher"
                        className="w-full px-2 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                    />
                </div>
                <button 
                    onClick={()=> setVisible(true)}
                    className="w-full md:w-auto p-2 flex items-center justify-center border border-purple-800 rounded-md hover:text-purple-700  bg-gray-50 cursor-pointer"
                >
                    <FaPlus size={16} className="mr-1"/> 
                    <span>Add New Book</span>
                </button>
            </div>
            <div className="">
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
                    <Column field="title" header="Title" style={{width:"25vw"}}></Column>
                    <Column field="author" header="Author"></Column>               
                    <Column field="publisher" header="Publisher"></Column>
                    <Column field="category" header="Genre"></Column>  
                    <Column field="newPrice" header="Price ($)"></Column>
                    <Column field="quantity" header="Qty" body={quantityTemplate}></Column>
                    <Column header="Action" className="" body={(rowData)=>(
                        <div className="flex gap-2 justify-center">
                            <button className="p-2" title="View More" onClick={()=> {setShow(true), setSelectedBook(rowData)}}>
                                <HiDotsHorizontal className="text-xl text-gray-700 cursor-pointer" />
                            </button>  
                            <button className="p-2" title="Edit" onClick={()=>{setSelectedBook(rowData), setVisible(true), setIsEdit(true)}}>
                                <IoPencil className="text-xl text-green-700 cursor-pointer" />
                            </button>                          
                            <button className="p-2" title="Delete" onClick={()=>handleDeleteBook(rowData?._id)}>
                                <MdDelete className="text-xl text-red-700  cursor-pointer animate-bounce"/>
                            </button>
                        </div>
                    )}/>                   
                </DataTable>
            </div>
        </main>
      

        <Dialog 
            header={isEdit ? "Update Book" :"Add New Book"} 
            visible={visible} 
            style={{ width: '75vw' }} 
            onHide={() => {setVisible(false), setIsEdit(false),setSelectedBook(null)}}
        
        >
            <AddEditBookModal 
                selectedBook={selectedBook} 
                isEdit={isEdit} 
                setIsEdit={setIsEdit} 
                setVisible={setVisible} 
            />
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