
import { createBrowserRouter, RouterProvider , Outlet} from 'react-router-dom';

import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard';
import ManageBooks from './components/ManageBooks';
import TestComponent from './components/TestComponent';

import { Toaster } from 'react-hot-toast';

function App() {

    let appRoutes = createBrowserRouter([
        {
            path : "/",
            element : <AdminLogin />
        },
        {
            path : "/admin/login",
            element : <AdminLogin />
        },
        {
            path : "/admin/dashboard",
            element : <AdminDashboard />
        },
		{
            path : "/admin/manage/books",
            element : <ManageBooks />
        },
		{
            path : "/admin/test",
            element : <TestComponent />
        },
        {
            path : "*",
            element : <h2 style={{fontSize:"1.2rem", color:"red", fontFamily:"monospace", textAlign:"center", margin:"1rem 0"}}>Opps: The Page you are looking for doesn't exist!!!</h2>
        }
    ])

    return(
        
        <RouterProvider router={appRoutes}>
            <Toaster />
			<Outlet />
        </RouterProvider>
    )
}

export default App;
