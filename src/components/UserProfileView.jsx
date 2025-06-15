
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getUserDetails, logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const UserProfileView = () => {

    let {user} = useSelector(store => store?.user);
    const [isDisabled, setIsDisabled] = useState(false);
    let phoneExp = new RegExp("^[6-9]\\d{9}$"); 

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name : {
            value : "",
            error : "",
        },
        number : {
            value : "",
            error : "",
        },
    });

    useEffect(()=>{
        setFormValues({
            name : {
                value  : user?.name,
                error :"",
            }, 
            number : {
                value  : user?.number || "",
                error :"",
            }
        })
    },[])

    function handleChange(e)
    {
        let {name , value} = e.target;

        let newValues = {...formValues};
        if (name == "name")
        {
            newValues[name] = {
                value : value && value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required" : ""
            }
        }

        if(name == "number"){
            newValues[name] = {
                value : value && value >= 6 ? parseInt(value) || "" :"",
                error : !value ? "Required" : (value >=0 && value <=5) ? "Mobile Number must start between 6-9 & must be 10 digits":"",
            }
        }
        setFormValues(newValues);
    }

    const handleUpdate =async ()=>{
        if(formValues.name.value?.trim() ==""){
            setFormValues({...formValues,
                name :{
                    ...formValues.name,
                    error: "required*"
                }
            });
            return;
        }

        if (!formValues.number.value || !phoneExp.test(formValues.number.value)){
            setFormValues({
                ...formValues,
                number : {
                    ...formValues.number,
                    error :!formValues.number.value ? "Required" :"Invalid Number",
                }
            });
            return;
        }

        let data = {
            name : formValues.name.value?.trim(),
            number : formValues.number.value,
        };

        try {
            setIsDisabled(true);
            let res = await axios.patch(BASE_URL + "/update/profile", data, {withCredentials : true});
            if(res.data.success){
                toast.success(res.data?.message, {duration:2000});
                dispatch(getUserDetails());
                setIsDisabled(false);
            }
        } catch (error) {
            console.log("error ", error);
            setIsDisabled(false);
            if(error.status == 401 || error.status == 500){
                dispatch(logoutUser());
                navigate("/user/signin");                
            }
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }


    return (
    <div className="p-6 rounded=lg space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                    name="name"
                    type="text"
                    autoComplete='off'
                    value={formValues.name.value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <span className='text-sm text-red-500'>{formValues.name.error}</span>
            </div>
    
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email Address</label>
                <p className="bg-gray-100 px-3 py-2 rounded-md text-gray-600">{user?.email}</p>
            </div>
    
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Mobile Number</label>
                <input 
                    name="number"
                    type="text"
                    autoComplete='off'
                    maxLength={10}
                    value={formValues.number.value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
                <span className='text-sm text-red-500'>{formValues.number.error}</span>
            </div>
    
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                <p className="bg-gray-100 px-3 py-2 rounded-md text-gray-600 capitalize">{user?.role}</p>
            </div>
        </div>
      
        <div className="">
            {isDisabled ?  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
            <button 
                onClick={handleUpdate}
                className={`px-4 py-2 border border-purple-600 text-violet-500 rounded-md transition text-sm font-medium cursor-pointer`}
            > 
                Update Profile
            </button>
            }
        </div>
    </div>
      
    )
}

export default UserProfileView;
