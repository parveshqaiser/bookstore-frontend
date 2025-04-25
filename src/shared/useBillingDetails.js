

import React, { useState } from 'react'

export const useBillingDetails = ()=>{

    const [formValues , setFormValues] = useState({
        name : {
            value : "",
            error : ""
        },
        email : {
            value : "",
            error : "",
        },
        number : {
            value : "",
            error : "",
        },
        doorNo : {
            value : "",
            error : "",
        },
        state : {
            value : "",
            error : "",
        },
        city : {
            value : "",
            error : "",
        },
        pinCode : {
            value : "",
            error : "",
        },
    });

    return {formValues ,setFormValues};
};
