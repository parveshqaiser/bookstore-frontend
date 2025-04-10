

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    let user = useSelector(store => store?.user?.user);
    return user ? children : <Navigate to="/user/signin" />;
};

export default PrivateRoute;