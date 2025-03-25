

import React, { useState } from 'react'

const useAddBook = () => {
  
    const [formValues , setFormValues] = useState({
        title : {
            value : "",
            error : ""
        },
        author : {
            value : "",
            error : "",
        },
        category : {
            value : "",
            error : "",
        },
        description : {
            value : "",
            error : ""
        },
        publisher : {
            value : "",
            error : "",
        },
        language : {
            value : "",
            error : "",
        },
        pages : {
            value : "",
            error : ""
        },
        quantity : {
            value : "",
            error : "",
        },
        newPrice : {
            value : "",
            error : "",
        },
        oldPrice : {
            value : "",
            error : "",
        },
        coverPic : ""
    });

    return {formValues ,setFormValues}
}

export default useAddBook;
