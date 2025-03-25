import React from 'react'
import AdminNavbar from './AdminNavbar.jsx'
import DashboardHeader from './DashboardHeader.jsx';
import TablesCharts from "./TablesCharts.jsx"

const AdminDashboard = () => {

    
    return (
        <>
            <AdminNavbar />
            <DashboardHeader />
            <TablesCharts />
        </>
    )
}

export default AdminDashboard;