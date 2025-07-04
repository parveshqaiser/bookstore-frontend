

import React, { useEffect, useState} from 'react';
import useAddBook, { initialFormValues } from '../shared/useAddBook';
import { categoryList } from '../utils/constants';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getAllBooksList, resetBookFetchStatus } from '../redux/bookSlice';

const AddEditBookModal = ({selectedBook, isEdit , setVisible, setIsEdit}) => {

    let {formValues, setFormValues} = useAddBook();
    const [file, setFile] = useState(null);
    const [isDisable, setIsDisable] = useState(false);

    let dispatch = useDispatch();

    useEffect(()=>{
        setFormValues({
            title : {
                value : selectedBook?.title,
                error : ""
            },
            author : {
                value : selectedBook?.author,
                error : "",
            },
            category : {
                value : selectedBook?.category,
                error : "",
            },
            description : {
                value : selectedBook?.description,
                error : ""
            },
            publisher : {
                value : selectedBook?.publisher,
                error : "",
            },
            language : {
                value : selectedBook?.language,
                error : "",
            },
            pages : {
                value : selectedBook?.pages,
                error : ""
            },
            quantity : {
                value : selectedBook?.quantity,
                error : "",
            },
            newPrice : {
                value : selectedBook?.newPrice,
                error : "",
            },
            oldPrice : {
                value : selectedBook?.oldPrice,
                error : "",
            }
        })
    },[]);

    const handleChange = (e)=>{
        let {name, value} = e.target;

        let newValues = {...formValues};

        if(name == "title" || name == "author" || name =="description" || name =="publisher" || name=="language")
        {
            newValues[name]={
                value : value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required*" : ''
            }
        }

        else if(name == "pages" || name == "quantity" || name == "newPrice" || name == "oldPrice")
        {
            newValues[name]={
                value : parseInt(value) || "",
                error : !value ? "Required*" : ''
            }
        }
        else {
            newValues[name]={
                value : value || "",
                error : !value ? "Required*" : ''
            }
        }
        setFormValues(newValues);
    }

    const handleCLick = async ()=>{

        let formData = new FormData();

        let isAllValuesExist = Object.values(formValues).every(val => 
            typeof val.value === "string" ? val.value.trim() !== "" : val.value !== undefined && val.value !== null
        );

        if(!isAllValuesExist)
        {
            toast.error("All Fields are required", {duration : 2500});
            return;
        }

        if(!isEdit && !file?.name)
        {
            toast.error("Please Upload Book Cover", {duration : 2500});
            return;
        }

        formData.append("title", formValues.title.value);
        formData.append("author", formValues.author.value);
        formData.append("category", formValues.category.value);
        formData.append("description", formValues.description.value);
        formData.append("publisher", formValues.publisher.value);
        formData.append("language", formValues.language.value);
        formData.append("pages", formValues.pages.value);
        formData.append("quantity", formValues.quantity.value);
        formData.append("newPrice", formValues.newPrice.value);
        formData.append("oldPrice", formValues.oldPrice.value);

        if(file?.name){
            formData.append("coverPic", file || "");
        }

        if(isEdit == false)
        {
            try {
                setIsDisable(true);
                let res = await axios.post(`${BASE_URL}/addBook`,formData, {withCredentials:true});
                if(res.data.success)
                {
                    toast.success(`${res.data.message}`, {position: "top-center", duration : 2500});
                    setTimeout(()=>{
                        dispatch(getAllBooksList());
                        dispatch(resetBookFetchStatus());
                        setIsDisable(false);
                        setVisible(false);
                    },2500)
                }
            } catch (error) {
                toast.error(`${error?.message}`, {position: "top-center", duration : 2500})
                setIsDisable(false);
            }
        }

        if (isEdit)
        {
            let data = {
                title : formValues.title.value,
                author : formValues.author.value,
                category : formValues.category.value,
                description : formValues.description.value,
                publisher : formValues.publisher.value,
                language  : formValues.language.value,
                pages : formValues.pages.value,
                quantity: formValues.quantity.value,
                newPrice : formValues.newPrice.value,
                oldPrice : formValues.oldPrice.value
            };

            try {
                setIsDisable(true);
                let res = await axios.put(`${BASE_URL}/updateBook/${selectedBook?._id}`,data, {withCredentials:true});
                if(res.data.success)
                {
                    toast.success(`${res.data.message}`, {position: "top-center", duration : 2500});
                    setIsEdit(false);
                    setTimeout(()=>{
                        dispatch(getAllBooksList());
                        setFormValues(initialFormValues);
                        setIsDisable(false);
                        setVisible(false);
                    },2500)
                }
            } catch (error) {
                toast.error(`${error?.message}`, {position: "top-center", duration : 2500})
                setIsDisable(false);
            }
        }
    }   

    return (
    <>
        <div className='grid md:grid-cols-3 gap-4 mb-3'>
            <div>
                <label>Title</label>
                <div>
                    <input 
                        type="text"
                        name='title'
                        data-pr-tooltip='Enter name'
                        onChange={handleChange}
                        value={formValues.title.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.title.value && (
                    <span className='text-red-500 text-sm'>{formValues?.title?.error}</span>
                )}
            </div>

            <div>
                <label>Author</label>
                <div>
                    <input 
                        type="text"
                        name='author'
                        onChange={handleChange}
                        value={formValues.author.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.author.value && (
                    <span className='text-red-500 text-sm'>{formValues?.author?.error}</span>
                )}
            </div>    

            <div>
                <label>Category</label>
                <select 
                    name='category' 
                    className='block p-2 w-full border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent' 
                    onChange={handleChange}
                    value={formValues.category.value}
                >
                    <option value="">Select A Genre</option>
                    {categoryList.map((list, idx)=>(
                        <option className='p-1' value={list} key={idx}>{list}</option>
                    ))}
                </select>
                {!formValues.category.value && (
                    <span className='text-red-500 text-sm'>{formValues?.category?.error}</span>
                )}                   
            </div>           
        </div>

        <div className='grid md:grid-cols-1 mb-2'>
            <label >Description</label>
            <div>
                <textarea
                    rows={isEdit ? 3 : 2}
                    name='description'
                    onChange={handleChange}
                    value={formValues.description.value} 
                    className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                />
            </div>
            {!formValues.description.value && (
                <span className='text-red-500 text-sm'>{formValues?.description?.error}</span>
            )}   
        </div>

        <div className='grid md:grid-cols-3 gap-4 mb-3'>
            <div>
                <label >Publisher</label>
                <div>
                    <input 
                        type="text"
                        name='publisher'
                        onChange={handleChange}
                        value={formValues.publisher.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.publisher.value && (
                    <span className='text-red-500 text-sm'>{formValues?.publisher?.error}</span>
                )}  
            </div>

            <div>
                <label>Language</label>
                <div>
                    <input 
                        type="text"
                        name='language'
                        onChange={handleChange}
                        value={formValues.language.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.language.value && (
                    <span className='text-red-500 text-sm'>{formValues?.language?.error}</span>
                )}  
            </div>    

            <div>
                <label>Pages</label>
                <div>
                    <input 
                        type="text"
                        name='pages'
                        onChange={handleChange}
                        value={formValues.pages.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.pages.value && (
                    <span className='text-red-500 text-sm'>{formValues?.pages?.error}</span>
                )}  
            </div>           
        </div>

        <div className='grid md:grid-cols-3 gap-4 mb-3'>
            <div>
                <label >Quantity</label>
                <div>
                    <input 
                        type="text"
                        name='quantity'
                        onChange={handleChange}
                        value={formValues.quantity.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.quantity.value && (
                    <span className='text-red-500 text-sm'>{formValues?.quantity?.error}</span>
                )}  
            </div>

            <div>
                <label>New Price (₹)</label>
                <div>
                    <input 
                        type="text"
                        name='newPrice'
                        onChange={handleChange}
                        value={formValues.newPrice.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.newPrice.value && (
                    <span className='text-red-500 text-sm'>{formValues?.newPrice?.error}</span>
                )}  
            </div>    

                <div>
                <label >Old Price (₹)</label>
                <div>
                    <input 
                        type="text"
                        name='oldPrice'
                        onChange={handleChange}
                        value={formValues.oldPrice.value}
                        className="w-full px-3 py-2 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent" 
                    />
                </div>
                {!formValues.oldPrice.value && (
                    <span className='text-red-500 text-sm'>{formValues?.oldPrice?.error}</span>
                )}  
            </div>           
        </div>

        {!isEdit && (
            <div className='my-4'>
            {
                !file && (
                <>
                    <label htmlFor="coverPic" className="p-2 border border-gray-800 cursor-pointer rounded-lg md:w-auto w-full">
                        Upload Book Cover
                    </label>
                    <input 
                        type="file" 
                        id="coverPic" 
                        accept="image/png, image/jpeg" 
                        className="hidden" 
                        onChange={(e)=> setFile(e.target.files[0] || "")}
                    />
                </>
                )
            }
                <span className=''>{file?.name || ""}</span>  
                {file && <span title='Remove Pic' onClick={()=> setFile(null)} className='sm:mx-3 cursor-pointer text-red-500'>X</span>}  
            </div>
        )}

        <div className='text-center'>
            <button 
                disabled={isDisable}
                onClick={handleCLick}
                className='px-4 py-2 border border-purple-800 hover:text-purple-700 rounded-md cursor-pointer md:w-1/4'
            >
                {isDisable? "Submitting .Please wait.." : "Submit"}
            </button>
        </div>
    </>
  )
}

export default AddEditBookModal
