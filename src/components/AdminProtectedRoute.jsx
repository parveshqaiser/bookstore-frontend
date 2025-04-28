

import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({children}) => {
 
    let {adminData} = useSelector(store => store?.admin);

    return (adminData && adminData.role =="admin") ? children : <Navigate to="/admin/login" />
    
}

export default AdminProtectedRoute;
