
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
    <main className='max-w-6xl md:mx-auto my-10 mx-4 shadow-sm pb-4 relative bg-white'>

        <img src={loginLogo} alt='Book logo' className='w-40  mx-auto rounded-full'/>

        <h1 className="md:text-2xl text-lg font-bold text-purple-700 mb-2 text-center">The Book Story Shop</h1>
        <p className="text-gray-600 text-center">{newUser ? "Create your account" : "Welcome back"}</p>
        <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto"></div>

        <section className='w-full max-w-sm mx-auto my-2'> 
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
                    // className="py-2 px-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-blue-50/60 text-gray-600" 
                    className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
            </div>)}
            <div className='mb-4'>
                <input 
                    type="text"
                    value={inputValues.email}
                    onChange={(e)=>setInputValues({...inputValues, email : e.target.value.trim() || ''})}
                    placeholder='Enter Email' 
                    className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
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
                     className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
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
            {
                isDisabled ?  
                    (<div className="text-center">
                        <ProgressSpinner 
                            style={{width: '50px', height: '50px'}} 
                            strokeWidth="8" fill="var(--surface-ground)" 
                            animationDuration=".5s" 
                        /> 
                    <p className="text-gray-600 text-sm">Please Wait...</p>
                </div> ): (
                   <button
                        onClick={handleClick}
                        disabled={newUser && pwdDisabled}
                        className={`w-full py-3 px-3 cursor-pointer rounded-xl font-medium transition-all duration-200 ${
                        newUser && pwdDisabled
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        }`}
                    >
                        {newUser ? "Create Account" : "Sign In"}
                    </button>
                    )
                }
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {!newUser ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => {
                            setNewUser(!newUser)
                            setInputValues({ name: "", email: "", password: "" })
                            setIsPasswordFocus(false)
                        }}
                        className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors cursor-pointer "
                    >
                        {!newUser ? "Sign up here" : "Sign in"}
                    </button>
                </p>
            </div>

            <p className='text-sm text-center'>
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors" >
                Go to Home <FaArrowRightLong className='inline ml-1' />
                </Link>
            </p>
        </section>

        {(newUser && isPaswordFocus) &&  
        <aside className={`passwordValidationList absolute rounded-lg shadow-lg border border-gray-100 p-4 z-10`}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
            <div className='text-sm font-medium font-serif'>
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
            </div>
        </aside>}
    </main>
    )
}

export default SignIn;
