
import axios from "axios";
import { BASE_URL } from "../utils/api";
// import { useNavigate } from "react-router-dom";

// let navigate = useNavigate();

let api = axios.create({baseURL : BASE_URL, withCredentials:true});


api.interceptors.response.use(
    response => response,
    error => {
        console.log(error, "axios error");

        if (error.response?.status === 401){
            window.location.href = "/user/login";
        }
    }
);

export default api;