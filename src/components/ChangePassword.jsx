

import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/api';

const ChangePassword = () => {

	const [isDisabled, setIsDisabled] = useState(false);

	let initialFormValues = {
        currentPassword : {value : "", error : ""},
        newPassword : {value : "", error : ""},
        confirmPassword : {value : "", error : ""},
    };

	const [formValues, setFormValues] = useState({
        currentPassword : {value : "", error : ""},
        newPassword : {value : "", error : ""},
        confirmPassword : {value : "", error : ""},
    });

	function handleChange(e)
    {
        let {name ,value} = e.target;

        let newValues = {...formValues};
        
        newValues[name] ={
            value : value && value.trim(),
            error : !value ? "Required" : ""
        };

        setFormValues(newValues);
    }

	const handleSubmit = async()=>{

		let isEmpty = Object.values(formValues).some(val => val.value?.trim() =="");

		if(isEmpty)
		{
			toast.error("All Fields are required", {duration:2500});
			return;
		}

		if(formValues.newPassword.value !== formValues.confirmPassword.value)
		{
			toast.error("New Password Doesn't match", {duration:2500});
			return;
		}

		let data = {
			password : formValues.currentPassword.value,
			newPassword : formValues.newPassword.value,
		};

		try {
			setIsDisabled(true)
			let res = await axios.post(BASE_URL + "/update/password", data, {withCredentials:true});
			if(res.data.success)
			{
				toast.success(res.data.message,{duration:2500});
				setIsDisabled(false);
				setFormValues(initialFormValues);
			}
		} catch (error) {
			setIsDisabled(false);
			toast.error(error?.response?.data?.message || error?.message, {duration:2000})
		}
	}

	return (
		<div className="p-6 rounded=lg space-y-6">
    		<h2 className="text-xl font-semibold text-gray-800 mb-4">Update Your Password</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Your Current Password</label>
					<input 
						title='Space are not allowed'
						name="currentPassword"
						type="password"
						value={formValues.currentPassword.value}
						autoComplete='off'
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
					/>
					<span className='text-sm text-red-500'>{formValues.currentPassword.error}</span>
				</div>
    
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Your New Password</label>
					<input 
						name="newPassword"
						type="password"
						value={formValues.newPassword.value}
						autoComplete='off'
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
					/>
					<span className='text-sm text-red-500'>{formValues.newPassword.error}</span>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
					<input 
						name="confirmPassword"
						type="password"
						value={formValues.confirmPassword.value}
						autoComplete='off'
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
					/>
					<span className='text-sm text-red-500'>{formValues.confirmPassword.error}</span>
				</div>
			</div>
      
			<div className="">
				{isDisabled ?  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
				<button 
					onClick={handleSubmit}
					className={`px-4 py-2 border border-purple-600 text-violet-500 rounded-md transition text-sm font-medium cursor-pointer`}
				> 
					Update
				</button>
				}
			</div>
    </div>
	)
}

export default ChangePassword;
