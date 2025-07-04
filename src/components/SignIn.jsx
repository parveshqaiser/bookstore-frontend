
import React, { useEffect, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import loginLogo from "../assets/login-logo.png";
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import validator from "validator";
import { addTempUserData, getUserDetails } from '../redux/userSlice';
import { getAllBooksList } from '../redux/bookSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FaArrowRightLong } from 'react-icons/fa6';
import "../App.css";

const SignIn = () => {

    const [toggleIcons , setToggleIcons] = useState(false);
    const [inputValues, setInputValues] = useState({name : "", email:"",  password:""});
    const [isDisabled, setIsDisabled] = useState(false); // onlick of disabling button
    const [pwdDisabled , setPwdDisabled] = useState(true);
    const [isPaswordFocus , setIsPasswordFocus] = useState(false);
    const[newUser , setNewUser] = useState(false);

    const [validations, setValidations] = useState({
        length: false,
        symbol: false,
        number: false,
        lowerCase: false,
        upperCase: false,
    });

    let user = useSelector(store => store?.user?.user);

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        if(user && user.role == "user")
        {
            navigate("/")
        }
    },[])

    function handlePasswordValidation(){
        Object.values(validations).every(val=> val == true) ?  setPwdDisabled(false) : setPwdDisabled(true)
    }
    
    const handleClick = async()=>{

        let isSomeFieldEmpty = Object.values(inputValues).some(val => val.trim() =="");

        if(newUser && isSomeFieldEmpty){
            toast.error("All Inputs are required",{position:"top-center", duration:2000})
            return;
        };

        if(!validator.isEmail(inputValues.email))
        {
            toast.error("Invalid Email")
            return;
        }

        if(!inputValues.password)
        {
            toast.error("Password Required")
            return;
        }

        let registerData = {
            name : inputValues.name,
            email : inputValues.email,
            password : inputValues.password, 
        };

        let loginData = {
            email : inputValues.email,
            password : inputValues.password, 
        }

        // registration time
        if(newUser)
        {
            try {
                setIsDisabled(true);
                let res = await axios.post(BASE_URL + "/register/user",registerData, {withCredentials: true});
                if(res?.data?.success)
                {
                    dispatch(addTempUserData(res.data.data))
                    toast.success(res.data.message, {duration:2000});
                    setTimeout(()=>{
                        setIsDisabled(false);
                        navigate("/user/otp/verify")
                    },1800)
                }
            } catch (error) {
                setIsDisabled(false);
                toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            }
        }else{
            // login time
            try {
                setIsDisabled(true);
                let res = await axios.post(BASE_URL + "/user/login",loginData, {withCredentials: true});
                if(res?.data?.success)
                {
                    dispatch(getUserDetails());
                    // dispatch(getAllBooksList());
                    toast.success(res.data.message, {duration:2000});
                    setTimeout(()=>{
                        setIsDisabled(false);
                        navigate("/")
                    },1800)
                }
            } catch (error) {
                setIsDisabled(false);
                toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            }
        }  
    }

    return (
        <div className='max-w-6xl md:mx-auto my-10 mx-4 shadow-sm pb-4 relative'>
            <img src={loginLogo} alt='Book logo' className='w-40 mx-auto rounded-full'/>
            <h2 className='text-center font-mono text-xl text-purple-700 my-1'>The Book Story Shop</h2>
            <div className='w-80 mx-auto my-2'> 
                {newUser && 
                (<div className='mb-4'>
                    <input 
                        type="text" 
                        value={inputValues.name}
                        onChange={(e)=> {
                            let val = e.target.value;
                            if(val){
                                let up = val.charAt(0).toUpperCase() + val.slice(1);
                                setInputValues({...inputValues , name : up})
                            }else{
                                setInputValues({...inputValues , name : ""})
                            }
                        }}
                        placeholder='Enter Full Name' 
                        className="py-2 px-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-blue-50/60 text-gray-600" 
                    />
                </div>)}
                <div className='mb-4'>
                    <input 
                        type="text"
                        value={inputValues.email}
                        onChange={(e)=>setInputValues({...inputValues, email : e.target.value.trim() || ''})}
                        placeholder='Enter Email' 
                        className="py-2 px-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-blue-50/60 text-gray-600" 
                    />
                </div>
                <div className='mb-4 flex items-center relative'>
                    <input 
                        type={toggleIcons ? "text" : "password"} 
                        placeholder='Enter Password'
                        onKeyUp={handlePasswordValidation}
                        onFocus={()=> setIsPasswordFocus(true)}
                        onChange={(e) =>{
                           let {value} = e.target;
                            value = value.trim() || "";
                            setInputValues({ ...inputValues, password: value}),
                            setValidations({
                                length: value.length >= 8,
                                symbol: /[\W_]/.test(value),
                                number: /\d/.test(value),
                                lowerCase: /[a-z]/.test(value),
                                upperCase: /[A-Z]/.test(value),
                            });
                        }}
                        value={inputValues.password}
                        className="py-2 px-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-blue-50/60 text-gray-600"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setToggleIcons(!toggleIcons)}
                    >
                        {toggleIcons ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                </div>

                <div className='mb-2'>
                {isDisabled ?  
                    <div className="text-center">
                        <ProgressSpinner 
                            style={{width: '50px', height: '50px'}} 
                            strokeWidth="8" fill="var(--surface-ground)" 
                            animationDuration=".5s" 
                        /> 
                    <p className="text-gray-600 text-sm">Please Wait...</p>
                </div> :
                    <button 
                        onClick={handleClick}
                        disabled={newUser && pwdDisabled}
                        className={`px-4 py-2 rounded-md border border-purple-600 text-violet-900 w-full hover:ring-1 ${newUser && pwdDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        Submit
                    </button>}
                </div>

                <p className='text-center'>
                    <span className='text-sm'>{!newUser ?"Don't have an Account ?" : "Existing User ?" } &nbsp;</span>
                    <Link 
                        onClick={()=>{
                            setNewUser(!newUser), 
                            setInputValues({name :"", email:"", password :""})
                            setIsPasswordFocus(false)
                            }
                        }
                        className='text-blue-400 underline'>
                            {!newUser ? "Sign Up Here" : "Sign In"}
                    </Link>
                </p>

               <p className='text-sm text-center'>
                    <Link to="/" className='text-gray-600 hover:text-gray-800 transition' >
                    Go to Home <FaArrowRightLong className='inline ml-1' />
                    </Link>
                </p>
            </div>

            {(newUser && isPaswordFocus) &&  
            <aside className={`passwordValidationList absolute bg-white shadow-md text-sm w-64 z-10`}>
                <div className={validations.length ? 'valid' : 'error'}>
                    At least <b>8 characters</b>
                </div>
                <div className={validations.symbol ? 'valid' : 'error'}>
                    At least <b>one symbol</b>
                </div>
                <div className={validations.number ? 'valid' : 'error'}>
                    At least <b>one number</b>
                </div>
                <div className={validations.lowerCase ? 'valid' : 'error'}>
                    At least <b>one lower case</b>
                </div>
                <div className={validations.upperCase ? 'valid' : 'error'}>
                    At least <b>one upper case</b>
                </div>
            </aside>}
        </div>
    )
}

export default SignIn;
