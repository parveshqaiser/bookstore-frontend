

import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useRef, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logoutUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaMapPin } from 'react-icons/fa';
import { FaBuilding} from 'react-icons/fa';
import { HiHome, HiBriefcase} from 'react-icons/hi';


let initialFormValues = {
	area: {
		value :"",
		error : "",
	},
	doorNo : {
		value :"",
		error : "",
	},
	city : {
		value :"",
		error : "",
	},
	district : {
		value :"",
		error : "",
	},
	state : {
		value :"",
		error : "",
	}
};

const UserAddress = () => {

	let dispatch = useDispatch();
	let navigate = useNavigate();

	let {user} = useSelector(store => store?.user);
 	const [visible , setVisible] = useState(false); //modal

	const [isDisable, setIsDisable] = useState(false);
	const [isEdit , setIsEdit] = useState(false);
	const [activeIndex , setActiveIndex ] = useState(null);
	const [apiData, setApiData] = useState([]);
	const [pinText, setPinText] = useState("");
	const [pinCode , setPinCode] = useState("");

	const isManualClearRef = useRef(true);
	let addressType = ["Home", "Apartment", "Work", "Others"];
	let addressIcons = {
		Home: <HiHome className="inline mr-2 w-5 h-5 text-purple-500" />,
		Apartment: <FaBuilding className="inline mr-2 w-5 h-5 text-violet-600" />,
		Work: <HiBriefcase className="inline mr-2 w-5 h-5 text-orange-500" />,
		Others: <FaMapPin className="inline mr-2 w-5 h-5 text-green-500" />
	};

	const [formValues, setFormValues] = useState({
		area: {
			value :"",
			error : "",
		},
		addressType : {
			value :"",
			error :"",
		},
		doorNo : {
			value :"",
			error :"",
		},
		city : {
			value :"",
			error :"",
		},
		district : {
			value :"",
			error :"",
		},
		state : {
			value :"",
			error :"",
		},
	});

	const handleCLose =()=> {
		setVisible(false),
		setFormValues(initialFormValues),
		setIsEdit(false);
		setPinText("");
		setPinCode("");
		setApiData([]);
	};

	useEffect(()=>{
		const getPostalCode = async ()=>{
			if(pinText.length >5){
				try {
					let res = await axios.get(`https://api.postalpincode.in/pincode/${pinText}`)
					setApiData(res.data)
				} catch (error) {
					console.log(error);
				} 
			}else if(pinText.length < 6 && isManualClearRef.current) {
				setFormValues(initialFormValues);
				setApiData([]);
			}
			isManualClearRef.current = true;
		}	
		getPostalCode();	
	},[pinText]);

	function handleChange(e)
	{
		let {name, value} = e.target;
		let newValues = {...formValues};

		if(name == "doorNo" || name == "city" || name =="district" || name =="state")
		{
			newValues[name]={
                value : value.charAt(0).toUpperCase() + value.slice(1),
                error : !value ? "Required*" : ''
            }
		}

		if(name == "addressType"){
			newValues[name]={
				value : value,
				error : ""
			}
		}
		setFormValues(newValues);
	}

	function handleEdit(val, idx)
	{
		setActiveIndex(idx);
		setPinCode(val.pinCode);
		setFormValues({
			area : {
				value : val?.area,
				error : "",
			},
			addressType : {
				value : val?.addressType,
				error : "",
			},
			doorNo : {
				value : val?.doorNo,
				error : "",
			},
			city : {
				value :val?.city,
				error : "",
			},
			district : {
				value :val?.district,
				error : "",
			},
			state : {
				value :val?.state,
				error : "",
			}
		});
		setVisible(true);
		setIsEdit(true);
	}

	const handleDelete = async(id)=>{
		try {
			let res = await axios.delete(BASE_URL + `/delete/address/${id}`,{withCredentials:true});

			if(res.data.success)
			{
				toast.success(res.data.message , {duration:2500});
				dispatch(getUserDetails());
			}
		} catch (error) {
			if(error.status == 401){
                navigate("/user/signin");
				dispatch(logoutUser());
            }   
			toast.error(error?.response?.data?.message || error?.message, {duration:2000})
		}
	}

	const handleSubmit = async()=>{

		if(pinCode == ""){
			toast.error("Pin Required",{duration:2000})
			return;
		}

		if(formValues.doorNo.value.trim()==""){
			setFormValues({...formValues, doorNo : {...formValues.doorNo, error :"required*"}})
			return;
		}

		if(formValues.city.value.trim()==""){
			setFormValues({...formValues, city : {...formValues.city, error :"required*"}})
			return;
		}

		if(formValues.state.value.trim()==""){
			setFormValues({...formValues, state : {...formValues.state, error :"required*"}})
			return;
		}
		
		let data = {
			area : formValues.area.value,
			addressType : formValues?.addressType?.value || "Home",
			doorNo : formValues.doorNo.value.trim(),
			city : formValues.city.value.trim(),
			district : formValues.district.value.trim(),
			state : formValues.state.value.trim(),
			pinCode : pinCode,
		};

		if(isEdit == false) // add
		{
			try {
				setIsDisable(true)
				let res = await axios.post(BASE_URL + "/add/address",data,{withCredentials:true});
				if(res.data.success){
					toast.success(res.data.message, {duration:2500});
					setFormValues(initialFormValues);
					setPinCode("");
					setVisible(false);
					dispatch(getUserDetails());
					setIsDisable(false)
				}
			} catch (error) {
				if(error.status == 401){
                	navigate("/user/signin")
					dispatch(logoutUser());
            	}   
				setIsDisable(false)
				toast.error(error?.response?.data?.message || error?.message, {duration:2000})
			}
		}

		if(isEdit) // update
		{
			try {
				setIsDisable(true)
				let res = await axios.put(BASE_URL + `/update/address/${activeIndex}`,data,{withCredentials:true});
				if(res.data.success){
					toast.success(res.data.message, {duration:2500});
					setVisible(false);
					setPinCode("");
					setFormValues(initialFormValues);
					dispatch(getUserDetails());
					setIsDisable(false);					
				}
			} catch (error) {
				if(error.status == 401){
                	navigate("/user/signin");
					dispatch(logoutUser());
            	}   
				setIsDisable(false)
				toast.error(error?.response?.data?.message || error?.message, {duration:2000})
			}
		}		
	}

	return (
	<>
	<main className='border-b border-gray-200 pb-4'>
		<h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
		<p className="text-gray-600 mt-1">Manage your delivery addresses</p>
	</main>

	<main className='flex flex-wrap gap-4 mt-4 '>
		<div 
			onClick={()=> setVisible(true)}
			className='border border-dashed rounded-md p-6 w-[350px] h-auto cursor-pointer flex flex-col justify-center items-center'
		>
			<FiPlus size={48} className='text-gray-400' />
			<p className='text-center font-semibold text-gray-500'>Add New Address</p>
		</div>

		{user && user?.address?.map((val, index) => (
		<div className="space-y-3 p-4 border border-gray-400 w-[350px] h-auto">
			<div className="flex items-center space-x-2">
				{addressIcons[val.addressType]}
				<h3 className="font-semibold text-gray-900">{val.addressType}</h3>					
			</div>

			<div className="space-y-1 text-gray-600">
				<p className="font-medium text-gray-900">{val?.name}</p>
				<p className='text-sm'>{val?.doorNo}</p>
				<p className='text-sm'>{val?.city}</p>
				<p className='text-sm'>{val?.state} , {val?.pinCode}</p>
				<p className='text-sm'>Phone number: {user?.number}</p>
			</div>

			<div className="flex space-x-3 pt-4 border-t border-gray-100">
				<button 
					onClick={()=>handleEdit(val, index)}
					className="cursor-pointer flex-1 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-sm"
				>
					Edit
				</button>
				<button
					onClick={()=>handleDelete(index)}
					className="cursor-pointer flex-1 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm"
				>
					Delete
				</button>
			</div>
		</div>
		))}
	</main>

	<Dialog   
		header={isEdit ? "Update Address" : "Add Address"} 
		visible={visible} 
		style={{ width: '65vw' }} 
		onHide={handleCLose}
	>
		<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
			<div className="mb-2 relative">
				<label className="block font-medium">Enter 6 Digit Pin Code <span className="text-red-500"> *</span></label>
					<input 
						type="text"  
						maxLength={6}
						onChange={(e) =>{
							isManualClearRef.current = true,
							setPinCode(parseInt(e.target.value) || ""),
							setPinText(e.target.value)
						}}
						value={pinCode}
						className="w-full px-3 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
					/>
				{pinText && (
				<div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
					{apiData.length > 0 ? (
						apiData[0]?.PostOffice?.map((val, idx) => (
						<div 
							key={idx} 
							className="p-2 hover:bg-purple-100 cursor-pointer text-sm" 
							onClick={()=>{
								isManualClearRef.current = false,
								setPinText("");
								setFormValues({
									...formValues,
									area :{value : val?.Name},
									city : {value : val.Division},
									district : {value : val.District},
									state : {value : val.State},											
								})
							}}
						>
							{val?.Name}
						</div>
						))
					) : (
						<p className="p-1 text-red-400 text-sm">No Record Found</p>
					)}
				</div>)}
			</div>
			<div className='mb-2'>
				<label className='block'>Your Area <span className='text-red-500'>*</span></label>
				<input 
					type="text"
					value={formValues.area.value}
					readOnly
					className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
			</div>
			<div className="mb-1">
				<label className="block text-gray-700 mb-1">
					Address Type<span className="text-red-500">*</span>
				</label>
				<select 
					value={formValues?.addressType?.value}
					name="addressType" 
					className="w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
					onChange={handleChange}
				>
					{addressType.map((add, index) => (
					<option className="p-1" value={add} key={index}>{add}</option>
					))}
				</select>
			</div>
		</div>

		<div className='mb-2'>
			<label className='block'> Your Door No/ Street No/ Apartment <span className='text-red-500'> *</span></label> 
			<textarea
				name='doorNo'
				onChange={handleChange}
				value={formValues.doorNo.value}
				className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
			/>
			<span className='text-red-500 text-sm'>{formValues.doorNo.error}</span>
		</div>

		<div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
			<div className='mb-2'>
				<label className='block'>Your City <span className='text-red-500'> *</span></label>
				<input 
					type="text"
					name='city'
					onChange={handleChange}
					value={formValues.city.value}  
					className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<span className='text-red-500 text-sm'>{formValues.city.error}</span>
			</div>
			
			<div className='mb-2'>
				<label className='block'>Your District <span className='text-red-500'> *</span></label>
				<input 
					type="text"  
					name='district'
					onChange={handleChange}
					value={formValues.district.value}
					className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<span className='text-red-500 text-sm'>{formValues.district.error}</span>
			</div>
			<div className='mb-2'>
				<label className='block'>Your State <span className='text-red-500'> *</span></label>
				<input 
					type="text"  
					name='state'
					onChange={handleChange}
					value={formValues.state.value}  
					className="w-full px-2 py-2 rounded-md bg-blue-50/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400" 
				/>
				<span className='text-red-500 text-sm'>{formValues.state.error}</span>
			</div>
		</div>

		<div className='my-2'>
		{isDisable ?  
			<ProgressSpinner 
			style={{width: '50px', height: '50px', textAlign:"center"}} 
			strokeWidth="8" 
			fill="var(--surface-ground)" 
			animationDuration=".5s" 
		/>
		:
			<button 
				onClick={handleSubmit}
				className={`px-4 py-2 border border-purple-600 text-violet-500 rounded-md transition text-sm font-medium cursor-pointer`}
			>
				Submit
			</button>}
		</div>
	</Dialog>
	</>
	);
}

export default UserAddress;
