import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar.jsx'
import DashboardHeader from './DashboardHeader.jsx';
import DashboardBoxes from './DashboardBoxes.jsx';
import DashboardGraphs from './DashboardGraphs.jsx';
import { useDispatch } from 'react-redux';
import { getMonthlyWiseRevenue, getTotalBooks, getTotalQuantitySold, getTotalSales } from '../redux/dashboardSlice.js';

const AdminDashboard = () => {

    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getMonthlyWiseRevenue());
        dispatch(getTotalBooks());
        dispatch(getTotalQuantitySold());
        dispatch(getTotalSales());
    },[])
    
    return (
        <>
            <AdminNavbar />
            <DashboardHeader />
            <DashboardBoxes />
            <DashboardGraphs />
        </>
    )
}

export default AdminDashboard;