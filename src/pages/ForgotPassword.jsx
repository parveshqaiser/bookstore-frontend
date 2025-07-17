



import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import loginLogo from "../assets/login-logo.png";
import { InputOtp } from "primereact/inputotp";
import { RiLockPasswordFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
const ForgotPassword =()=> {


    const [email, setEmail] = useState("");
    const [inputValues, setInputValues] = useState({password : "", confirmPassword : ""});
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [token, setToken] = useState("");
    const [otpVeified , setOtpVerified] = useState(false);

    const handleSubmitEmail = async()=>{
        try {
            
        } catch (error) {
            
        }
    }


    const handleSubmitOtp = async()=>{
        try {
            
        } catch (error) {
            
        }
    }

    const handleSubmitPassword = async()=>{
        try {
            
        } catch (error) {
            
        }
    }

    return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <section className="w-full max-w-lg">
            <div className="shadow-xl bg-white/80 backdrop-blur-sm">
                <div className="text-center p-2">
                    {/* <div className="mx-auto mb-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg relative">
                        <FaBookOpen className="w-10 h-10 text-white" />
                        <div className="absolute -top-1 -right-3.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <HiOutlineMail className="w-2.5 h-2.5 text-white" />
                        </div>
                    </div> */}
                    <img src={loginLogo} alt='Book logo' className='w-40  mx-auto rounded-full'/>

                    <p className="text-2xl font-bold text-gray-800">Forgot Password?</p>
                    {!isEmailValid && <blockquote className="text-gray-600 mt-2">
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
                    {!isEmailValid && <div className="relative">
                        <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
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
                                value={inputValues.password}
                                onChange={(e)=>setInputValues({...inputValues, password:e.target.value})}
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

                    {!isEmailValid && (<button
                        onClick={handleSubmitEmail}
                        className="cursor-pointer w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                        Submit Email
                    </button>)}
                    {isEmailValid && (
                        <button
                            onClick={handleSubmitOtp}
                            className="cursor-pointer w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                        Submit OTP
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
