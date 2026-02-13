
import React, { useState } from 'react';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';

const ChangePassword = () => {

	const [isDisabled, setIsDisabled] = useState(false);

	const navigate = useNavigate();
	let dispatch = useDispatch();

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
			if(error.status == 401){
				navigate("/user/signin")
				dispatch(logoutUser());
			}  
		}
	}

	return (
	<main className="rounded=lg space-y-6">
		<header className="border-b border-gray-200 pb-4">
			<h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
			<p className="text-gray-600 mt-1">Update your password to keep your account secure</p>
		</header>

		<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Your Current Password</label>
				<input 
					title='Space not allowed'
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
		</section>

		<section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
		</section>

		<section className="bg-blue-50 border border-blue-300 rounded-lg p-4">
			<h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
			<ul className="text-sm text-blue-800 space-y-1">
				<li>• At least 8 characters long</li>
				<li>• Contains at least one uppercase letter</li>
				<li>• Contains at least one lowercase letter</li>
				<li>• Contains at least one number</li>
				<li>• Contains at least one special character</li>
			</ul>
		</section>
	
		<section className="">
			{isDisabled ?  <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />:
			<button 
				onClick={handleSubmit}
				className={`px-4 py-2 border border-purple-600 text-violet-500 rounded-md transition text-sm font-medium cursor-pointer`}
			> 
				Update
			</button>
			}
		</section>
    </main>
	)
}

export default ChangePassword;
