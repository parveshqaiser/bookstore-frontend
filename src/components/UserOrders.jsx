

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllUserDeliveredOrders, getAllUserPendingOrders } from '../redux/orderSlice';
import { dateConverter } from '../utils/dateConverter';

import { FaShoppingBag } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';

const UserOrders = () => {

	let {userPendingOrder, userDeliveredOrder, isUserPendingOrderLoading, isUserDeliveredOrderLoading} = useSelector(store => store?.order);

	let dispatch = useDispatch();
	let navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllUserPendingOrders());
		dispatch(getAllUserDeliveredOrders());
	}, []);

	const getEstimatedDeliveryDate = () => {
		const today = new Date();
		today.setDate(today.getDate() + 4);
		return today.toISOString().split("T")[0];
	};

	const [activeTab, setActiveTab] = useState("pending");

	const showPendingOrders = () =>
    	userPendingOrder.length === 0 ? (
		<main className="text-center pt-10 py-4">
			<div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
				<FaShoppingBag className="w-16 h-16 text-purple-400" />
			</div>
			<h3 className="text-xl font-semibold text-gray-700 mb-2">No Pending Orders</h3>
			<p className="text-gray-500">You don't have any pending orders at the moment.</p>
		</main>
    	) : (
      	userPendingOrder.map((book, index) => (
        <main
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 hover:shadow-xl transition-all duration-300"
          key={book?._id}
        >
			<aside className="bg-gradient-to-r from-purple-50 to-violet-50 lg:px-6 lg:py-4 p-2 border-b border-purple-100">
				<nav className="flex flex-wrap justify-between items-center gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
							{index + 1}
						</div>
						<div>
							<p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Order ID</p>
							<p className="text-sm font-mono text-gray-800">#{book?._id}</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-2xl">
						<div className="text-center">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Placed</p>
							<p className="text-sm font-semibold text-gray-800">{dateConverter(book?.createdAt)}</p>
						</div>
						<div className="text-center">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
							<p className="text-lg font-bold text-purple-600">₹{book?.totalPrice}</p>
						</div>
						<div className="text-center relative group">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Ship To</p>
							<p className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-purple-600 transition-colors">
								{book?.name}
							</p>
							<div className="absolute top-full lg:left-1/6 left-1/2 transform -translate-x-1/2 mt-2 w-80 py-2 px-2 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
								<div className="space-y-2 text-sm">
									<p className="text-gray-600">{book?.number}</p>
									<p className="text-gray-600">{book?.email}</p>
									<div className="pt-2 border-t border-gray-100">
										<p className='text-wrap'>{book?.address?.doorNo}</p>
										<p>{book?.address?.city}, {book?.address?.state}</p>
										<p>PIN: {book?.address?.pinCode}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</aside>

			<aside className="px-3 py-3 bg-yellow-100 border-b border-yellow-100">
                <nav className="flex items-center gap-2">
					<div className="w-2 h-2 bg-orange-400 rounded-full"></div>
					<span className="text-sm font-medium text-orange-700">Estimated Delivery  {getEstimatedDeliveryDate()}</span>
				</nav>
            </aside>

			<aside className="p-3">
				<div className="space-y-4">
					{book?.bookDetails?.map((item, itemIndex) => (
					<div
						className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
						key={item?.title}
					>
						<div className="flex-shrink-0">
							<img
								className="w-16 h-20 object-cover rounded-lg shadow-sm"
								src={item?.coverPic || ""}
								alt={item?.title}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="text-sm font-semibold text-gray-800 truncate">{item?.title}</h4>
							<div className="flex items-center justify-between mt-2">
								<span className="text-sm text-gray-600">Qty: {book?.product[itemIndex]?.quantity || "N/A"}</span>
								<span className="text-sm font-bold text-purple-600">₹{book?.product[itemIndex]?.price}</span>
							</div>
						</div>
					</div>
					))}
				</div>
			</aside>
        </main>
      ))
    );
	
	const showDeliveredOrders = () => (
		userDeliveredOrder.length === 0 ? (
		<main className="text-center pt-10 py-4">
			<div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
				<HiCheck className="w-16 h-16 text-green-400" />
			</div>
			<h3 className="text-xl font-semibold text-gray-700 mb-2">No Delivered Orders</h3>
			<p className="text-gray-500">You don't have any delivered orders yet.</p>
		</main>
		) :  userDeliveredOrder.map((book, index) =>(
		<main
        	className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 hover:shadow-xl transition-all duration-300"
        	key={book?._id}
    	>
            <aside className="bg-gradient-to-r from-green-50 to-emerald-50 lg:px-6 lg:py-4 p-2 border-b border-green-100">
                <nav className="flex flex-wrap justify-between items-center gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</div>
						<div>
							<p className="text-xs font-medium text-green-600 uppercase tracking-wide">Order ID</p>
							<p className="text-sm font-mono text-gray-800">#{book?._id}</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-2xl">
						<div className="text-center">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Placed</p>
							<p className="text-sm font-semibold text-gray-800">{dateConverter(book?.createdAt)}</p>
						</div>
						<div className="text-center">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
							<p className="text-lg font-bold text-green-600">₹{book?.totalPrice}</p>
						</div>
						<div className="text-center relative group">
							<p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Delivered To</p>
							<p className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-green-600 transition-colors">
								{book?.name}
							</p>
							<div className="absolute top-full lg:left-1/6 left-1/2 transform -translate-x-1/2 mt-2 w-72 p-2 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
								<div className="space-y-2 text-sm text-wrap">
									<p className="font-semibold text-gray-800">{book?.name}</p>
									<p className="text-gray-600">{book?.number} • {book?.email}</p>
									<div className="pt-2 border-t text-wrap border-gray-100">
										<p>{book?.address?.doorNo}</p>
										<p>{book?.address?.city}, {book?.address?.state}</p>
										<p>PIN: {book?.address?.pinCode}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
                </nav>
            </aside>

            <aside className="px-3 py-3 bg-green-100 border-b border-green-100">
                <nav className="flex items-center gap-2">
					<div className="w-2 h-2 bg-green-500 rounded-full"></div>
					<span className="text-sm font-medium text-green-700">Delivered on {dateConverter(book?.updatedAt)}</span>
				</nav>
            </aside>

            <aside className="p-2">
                <nav className="space-y-4">
                {book?.bookDetails?.map((item, itemIndex) => (
                    <div
                    	className="flex items-center gap-4 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    	key={item?.title}
                    >
						<div className="flex-shrink-0">
							<img
							className="w-16 h-20 object-cover rounded-lg shadow-sm"
							src={item?.coverPic || "/placeholder.svg"}
							alt={item?.title}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h4 className="text-sm font-semibold text-gray-800 truncate">{item?.title}</h4>
							<div className="flex items-center justify-between mt-2">
								<span className="text-sm text-gray-600">Qty: {book?.product[itemIndex]?.quantity || "N/A"}</span>
								<span className="text-sm font-bold text-green-600">₹{book?.product[itemIndex]?.price}</span>
							</div>
						</div>
                    </div>
                ))}
                </nav>
            </aside>
        </main>
		))
	);

	if(isUserPendingOrderLoading || isUserDeliveredOrderLoading){
		return(
			<aside className="bg-gradient-to-r from-purple-50 to-violet-50 lg:px-6 lg:py-4 p-2 border-b border-purple-100">
				<nav className="flex flex-wrap justify-between items-center gap-4">
					<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-purple-200 rounded-full animate-pulse"></div>
					<div className="space-y-2">
						<div className="h-3 w-20 bg-purple-200 rounded animate-pulse"></div>
						<div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
					</div>
					</div>

					{/* Right side - Order details */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 max-w-2xl">
					{/* Order Placed */}
					<div className="text-center space-y-2">
						<div className="h-3 w-24 mx-auto bg-gray-200 rounded animate-pulse"></div>
						<div className="h-4 w-32 mx-auto bg-gray-200 rounded animate-pulse"></div>
					</div>
					
					{/* Total Amount */}
					<div className="text-center space-y-2">
						<div className="h-3 w-24 mx-auto bg-gray-200 rounded animate-pulse"></div>
						<div className="h-6 w-20 mx-auto bg-purple-200 rounded animate-pulse"></div>
					</div>
					
					{/* Ship To */}
					<div className="text-center space-y-2">
						<div className="h-3 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
						<div className="h-4 w-24 mx-auto bg-gray-200 rounded animate-pulse"></div>
					</div>
					</div>
				</nav>
			</aside>
		)
	}

	return(
	<>
	<main className="min-h-screen">
		<header className="border-b border-gray-200 pb-4">
         	<h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
         	<p className="text-gray-600 mt-1">Track and manage your orders</p>
       	</header>

		<section className="flex justify-center my-3">
			<div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100">
				<div className="flex space-x-2">
				<button
					onClick={() => setActiveTab("pending")}
					className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
					activeTab === "pending"
						? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg transform scale-105"
						: "text-purple-600 hover:bg-purple-50"
					}`}
				>
					Pending Orders
				</button>
				<button
					onClick={() => setActiveTab("delivered")}
					className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
					activeTab === "delivered"
						? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
						: "text-green-600 hover:bg-green-50"
					}`}
				>
					Orders Delivered
				</button>
				</div>
			</div>
		</section>

		<article className="transition-all duration-500">
			{activeTab === "pending" && showPendingOrders()}
			{activeTab === "delivered" && showDeliveredOrders()}
		</article>
	</main>
	</>
	)
}

export default UserOrders;
