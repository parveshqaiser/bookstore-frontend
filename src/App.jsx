
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
import AllBooks from './components/AllBooks';
import NotFoundPage from './components/NotFoundPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';

function App() {

    let appRoutes = createBrowserRouter([
        {
            path : "/",
            element : <Body />,
            children : 
            [
                {index: true, element: <HomePage /> },
                {path : "about", element : <AboutUs />},
                {path : "services", element : <Services />},
                {path : "book/view/:id",element : <SingleBookView />},
                {path : "cart/items",element : <CartItems />},
                {path : "all/books", element :<AllBooks />},
                {path : "order/details",element : <PrivateRoute><OrderPlacedPage/></PrivateRoute>},  // after placing order
                {path : "cart/checkout",element: <PrivateRoute><CheckoutPage /></PrivateRoute>},
                {path : "user/profile",element :<PrivateRoute><UserProfileLayout/></PrivateRoute>,
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
            element :<AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute>
        },
        {
            path : "/admin/manage/books",
            element : <AdminProtectedRoute><ManageBooks /></AdminProtectedRoute>
        },
        {
            path : "/admin/manage/orders",
            element : <AdminProtectedRoute><ManageOrders /></AdminProtectedRoute>
        },
        {
            path : "/admin/manage/orders/delivered",
            element : <AdminProtectedRoute><AdminDeliveredOrders /></AdminProtectedRoute>
        },
        {
            path : "*",
            element : <NotFoundPage />
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