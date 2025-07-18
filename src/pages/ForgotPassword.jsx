

import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import loginLogo from "../assets/login-logo.png";
import { InputOtp } from "primereact/inputotp";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import toast from "react-hot-toast";
import validator from "validator";


const ForgotPassword =()=> {

    let navigate = useNavigate();
    const [email, setEmail] = useState(""); // email
    const [token, setToken] = useState(""); // otp
    const [inputValues, setInputValues] = useState({newPassword : "", confirmPassword : ""});

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [otpVeified , setOtpVerified] = useState(false);
    const [initialMessage, setInitialMessage] = useState(true);

    const [isDisabled, setIsDisabled] = useState(false); // onlick of disabling button

    const handleSubmitEmail = async()=>{

        if(!validator.isEmail(email)){
            toast.error("Invalid Email")
            return;
        }

        try {
            setIsDisabled(true);
            let res = await axios.post(BASE_URL + "/forgot/password", {email}, {withCredentials:true});

            if(res.data.success)
            {
                toast.success(res.data.message, {duration:2000});
                setIsEmailValid(true);
                setInitialMessage(false);
                setIsDisabled(false);
            }
        } catch (error) {
            setIsDisabled(false);
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }


    const handleSubmitOtp = async()=>{
        try {
            console.log(token);
            setIsDisabled(true);
            let otp = token;
            let res = await axios.post(BASE_URL + "/verify/password/otp", {email,otp}, {withCredentials:true});

            if(res.data.success){
                setOtpVerified(true);
                setIsEmailValid(false);
                toast.success(res.data.message);
                setIsDisabled(false);
            }
        } catch (error) {
            setIsDisabled(false);
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    const handleSubmitPassword = async()=>{

        let {newPassword, confirmPassword} = inputValues;

        if(newPassword?.trim()== "" || confirmPassword?.trim()==""){
            return toast.error("Password Required");
        }

        if(newPassword.trim() !== confirmPassword.trim()){
            return toast.error("Password Not Nacthed")
        }

        try {
            let res = await axios.post(BASE_URL + "/confirm/reset/password", {email, newPassword}, {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/user/signin");
            }
        } catch (error) {
            setIsDisabled(false);
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <section className="w-full max-w-lg">
            <div className="shadow-xl bg-white/80 backdrop-blur-sm">
                <div className="text-center p-2">
                    <img src={loginLogo} alt='Book logo' className='w-40  mx-auto rounded-full'/>

                    <p className="text-2xl font-bold text-gray-800">Forgot Password?</p>
                    {initialMessage && <blockquote className="text-gray-600 mt-2 text-sm">
                        No worries! Enter your email address and we'll send you an OTP.
                    </blockquote>}

                    {isEmailValid && <p className="text-green-600 mt-2 text-sm">Please Enter the OTP sent to your email</p>}
                    {isEmailValid && 
                    <div className="flex justify-center mt-3">
                        <InputOtp
                            value={token}
                            integerOnly
                            onChange={(e) => setToken(e.value)}
                            length={6}
                            style={{ gap: "16px" }}
                        />
                    </div>}
                </div>

                <form className="space-y-4 p-6" onSubmit={(e)=>e.preventDefault()}>
                    {initialMessage && <div className="relative">
                        <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                            placeholder="Enter your email address"
                            className="pl-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>}

                    {otpVeified &&(
                    <> 
                        <div className="relative">
                            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                            <input
                                type="password"
                                value={inputValues.newPassword}
                                onChange={(e)=>setInputValues({...inputValues, newPassword:e.target.value})}
                                placeholder="Enter Your New Password"
                                className="pl-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div className="relative">
                            <GiConfirmed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4"/>
                            <input
                                type="password"
                                value={inputValues.confirmPassword}
                                onChange={(e)=>setInputValues({...inputValues, confirmPassword:e.target.value})}
                                placeholder="Confirm New Password"
                                className="pl-10 py-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </>
                    )}

                    {/* buttons  */}
                    {initialMessage && (
                        <button
                            disabled={isDisabled}
                            onClick={handleSubmitEmail}
                            className={`${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
                        >
                            {isDisabled ? "Submiting" : "Submit Email"}
                        </button>)
                    }

                    {isEmailValid && (
                        <button
                            onClick={handleSubmitOtp}
                            disabled={isDisabled}
                            className={`${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
                        >
                        {isDisabled ? "Submiting" : "Submit OTP"}
                    </button>)}

                    {otpVeified && (
                        <button
                            onClick={handleSubmitPassword}
                            className="cursor-pointer w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                        Reset Passowrd
                    </button>)}
                    

                    <p className="text-center text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link
                            to="/user/signin"
                            className="text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                        >
                            Sign in here
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    </main>
    )
};

export default ForgotPassword;
