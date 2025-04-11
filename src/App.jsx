
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard';
import ManageBooks from './components/ManageBooks';
import TestComponent from './components/TestComponent';

import { Toaster } from 'react-hot-toast';
import ManageOrders from './components/ManageOrders';
import AdminDeliveredOrders from './components/AdminDeliveredOrders';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import OtpVerification from './components/OtpVerification';
import SingleBookView from './components/SingleBookView';
import CartItems from './components/CartItems';
import CheckoutPage from './components/CheckoutPage';
import OrderPlacedPage from './components/OrderPlacedPage';
import UserOrders from './components/UserOrders';
import UserAddress from './components/UserAddress';
import ChangePassword from './components/ChangePassword';
import UserProfileLayout from './components/UserProfileLayout';
import UserProfileView from './components/UserProfileView';
import Body from './components/Body';
import PrivateRoute from './components/PrivateRoute';

function App() {

    let appRoutes = createBrowserRouter([
        {
            path : "/",
            element : <Body />,
            children : 
            [
                {index: true, element: <HomePage /> },
                {path : "book/view/:id",element : <SingleBookView />},
                {path : "cart/items",element : <CartItems />},
                {
                    path: "cart/checkout",
                    element: <PrivateRoute>
                        <CheckoutPage />
                    </PrivateRoute>,
                },
                {
                    path : "user/profile",
                    element :
                        <PrivateRoute>
                            <UserProfileLayout/>
                        </PrivateRoute>,
                    children : [
                        {
                            path : "view",
                            element : <UserProfileView />
                        }, 
                        {
                            path : "orders",
                            element : <UserOrders />
                        }, 
                        {
                            path : "address",
                            element : <UserAddress />
                        },
                        {
                            path : "change-password",
                            element : <ChangePassword />
                        }
                    ]
                },
            ]
        },
        {
            path : "order/details",
            element : <OrderPlacedPage/>
        },
        {
            path : "/user/signin",
            element : <SignIn />
        },
        {
            path : "/user/otp/verify",
            element : <OtpVerification />
        },
        // admin starts
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
            path : "*",
            element : <h2 style={{fontSize:"1.2rem", color:"red", fontFamily:"monospace", textAlign:"center", margin:"1rem 0"}}>Opps: The Page you are looking for doesn't exist!!!</h2>
        }
    ])

    return(
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <RouterProvider router={appRoutes} />
        </>
    )
}

export default App;

/*

{
    path : "/admin/test",
    element : <TestComponent />
},

*/