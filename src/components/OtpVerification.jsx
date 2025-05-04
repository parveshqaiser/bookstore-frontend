
import { InputOtp } from 'primereact/inputotp';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState } from 'react';
import logo1 from "../assets/login-logo.png";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/userSlice';

const OtpVerification = ()=>{

    const [token, setToken] = useState(""); // otp
    let loading = false;

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector(store=> store?.user?.userTemporaryData);

    const modifyEmail = (email) => {
        const [local, domain] = email.split("@");
        if (local.length < 4) return email;
        return `${local.slice(0, 3)}****${local.slice(-2)}@${domain}`;
    };

    // naveenkumarpeetha1997@gmail.com

    const handleSubmit = async()=>
    {
        let data = {
            email : user?.email,
            otp : token
        };

        try {
            let res = await axios.post(BASE_URL + "/verify/otp", data, {withCredentials:true});
            if(res.data.success)
            {
                dispatch(getUserDetails());
                toast.success(res.data.message || "User Verified", {duration:2000});
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    
    }

    const handleResendOtp = async()=>
    {
        setToken("");
        let email = user?.email;
        try {
            let res = await axios.post(BASE_URL + "/resend/otp",{email},{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message , {duration:2000})
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return(
        <main className="max-w-lg md:max-w-2xl mx-auto my-5 p-6 bg-white shadow-lg rounded-md">
            <img src={logo1} alt='Book logo' className='w-28 mx-auto rounded-full'/>
            <nav className="text-center">
                <h1 className="font-bold text-2xl text-purple-500 mb-4">User Verification</h1>
                <h2 className="font-semibold text-xl text-gray-700 mb-2">Authenticate Your Account</h2>
                <p className="text-gray-600">Please enter the code sent to</p>
                <span className="block font-semibold text-blue-500">{modifyEmail(user?.email || "abcdef@gmail.com")}</span>
    
                <div className="flex justify-center my-4">
                    <InputOtp
                        value={token}
                        integerOnly
                        onChange={(e) => setToken(e.value)}
                        length={6}
                        style={{ gap: "16px" }}
                    />
                </div>
    
                <div className="flex justify-around items-center mt-4">
                    <button 
                        onClick={handleResendOtp}
                        className='px-4 py-2 rounded-md border border-green-800 text-green-900 hover:ring-1 cursor-pointer'
                    >
                        Resend OTP
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className='px-4 py-2 rounded-md border border-purple-600 text-violet-900 hover:ring-1 cursor-pointer'
                    >
                        Submit
                    </button>
                </div>
    
                {loading && (
                    <div className="mt-4 flex justify-center">
                    <ProgressSpinner />
                    </div>
                )}
            </nav>
      </main>
    );
}

export default OtpVerification;