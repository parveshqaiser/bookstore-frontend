
import { createBrowserRouter, RouterProvider , Outlet} from 'react-router-dom';

import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard';
import ManageBooks from './components/ManageBooks';
import TestComponent from './components/TestComponent';

import { Toaster } from 'react-hot-toast';
import ManageOrders from './components/ManageOrders';
import AdminDeliveredOrders from './components/AdminDeliveredOrders';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import OtpVerification from './components/OtpVerification';
import SingleBookView from './components/SingleBookView';
import CartItems from './components/CartItems';

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
            path : "/admin/manage/orders",
            element : <ManageOrders />
        },
        {
            path : "/admin/manage/orders/delivered",
            element : <AdminDeliveredOrders />
        },
		{
            path : "/admin/test",
            element : <TestComponent />
        },
        {
            path : "/home",
            element : <HomePage />
        },
        {
            path : "/user/signin",
            element : <SignIn />
        },
        {
            path : "/user/otp/verify",
            element : <OtpVerification />
        },
        {
            path : "/book/view/:id",
            element : <SingleBookView />
        },
        {
            path : "/cart/items",
            element : <CartItems />
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
