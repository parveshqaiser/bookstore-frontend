

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUserDeliveredOrders, getAllUserPendingOrders } from '../redux/orderSlice';
import noPending from "../assets/no-pending.jpg";


const UserOrders = () => {

	let   {userPendingOrder} = useSelector(store => store?.order);
	let   {userDeliveredOrder} = useSelector(store => store?.order);

	let dispatch = useDispatch();

	useEffect(()=>{
		console.log("api call")
		dispatch(getAllUserPendingOrders());
		dispatch(getAllUserDeliveredOrders());
	},[dispatch]);

	const getEstimatedDeliveryDate = () => {
		const today = new Date();
		today.setDate(today.getDate() + 4);
		return today.toISOString().split("T")[0];
	};

	const [activeTab, setActiveTab] = useState("pending");

	const showPendingOrders = () => (
		userPendingOrder.length ==0 ? <div className='text-center'>
			<img src={noPending} alt="" className='w-52 mx-auto' />
		</div> : userPendingOrder.map(book =>(
		<main className="rounded-lg shadow-sm overflow-hidden" key={book?._id}>
			<header className="flex flex-wrap justify-around items-center bg-gray-100 px-2 py-3">
				
				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Order Placed</p>
					<span className="text-sm font-medium">{book?.createdAt.split("T")[0]}</span>
				</div>

				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Total</p>
					<span className="text-sm font-medium">$ {book?.totalPrice}</span>
				</div>

				<div className="relative group flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Shipped To</p>
					<span className="text-sm font-medium cursor-pointer">{book?.name}</span>

					<div className="text-sm absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 p-2 bg-white text-gray-700 border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
						<p>{book?.number} || {book?.email}</p>
						<p>{book?.address?.doorNo}</p>
						<p>{book?.address?.city} ,{book?.address?.state}</p>
						<p>{book?.address?.pinCode}</p>
					</div>
				</div>

				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Order ID</p>
					<span className="text-sm font-medium"># {book?._id}</span>
				</div>
			</header>

			<nav className="bg-gray-50 p-2 text-sm text-gray-600 font-medium">
				Estimated Delivery by {getEstimatedDeliveryDate()}
			</nav>

			<nav className="p-2">
				<table className="w-full border-collapse">
					<tbody>
					{book?.bookDetails?.map((item,index) =>(
						<tr className="hover:bg-gray-50 transition-colors" key={item?.title}>
						<td className="p-2">
						<img
							className="w-20 h-auto rounded"
							src={item?.coverPic}
							alt="Product Cover"
						/>
						</td>
						<td className="p-2  text-sm font-medium">{item?.title}</td>
						<td className="p-2 ">{book?.product[index]?.quantity || "NA"}</td>
						<td className="p-2 ">$ {book?.product[index]?.price}</td>
					</tr>
					))}					
					</tbody>
				</table>
			</nav>
		</main>
		))
	);
	
	const showDeliveredOrders = () => (
		userDeliveredOrder.length ==0 ? <div className='text-center'>
			<img src={noPending} alt="" className='w-52 mx-auto' />
		</div> : userDeliveredOrder.map(book =>(
		<main className="rounded-lg shadow-sm overflow-hidden" key={book?._id}>
			<header className="flex flex-wrap justify-around items-center bg-gray-100 px-2 py-3">
				
				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Order Placed</p>
					<span className="text-sm font-medium">{book?.createdAt.split("T")[0]}</span>
				</div>

				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Total</p>
					<span className="text-sm font-medium">$ {book?.totalPrice}</span>
				</div>

				<div className="relative group flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Shipped To</p>
					<span className="text-sm font-medium cursor-pointer">{book?.name}</span>

					<div className="text-sm absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 p-2 bg-white text-gray-700 border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
						<p>{book?.number} || {book?.email}</p>
						<p>{book?.address?.doorNo}</p>
						<p>{book?.address?.city} ,{book?.address?.state}</p>
						<p>{book?.address?.pinCode}</p>
					</div>
				</div>

				<div className="flex flex-col items-center">
					<p className="text-gray-500 text-xs font-mono uppercase">Order ID</p>
					<span className="text-sm font-medium"># {book?._id}</span>
				</div>
			</header>

			<nav className="bg-gray-50 p-2 text-sm text-gray-600 font-medium">
				Delivered On {book?.updatedAt?.split("T")}
			</nav>

			<nav className="p-2">
				<table className="w-full border-collapse">
					<tbody>
					{book?.bookDetails?.map((item,index) =>(
						<tr className="hover:bg-gray-50 transition-colors" key={item?.title}>
						<td className="p-2 w-[90px] h-auto">
						<img
							className="w-full object-fill rounded"
							src={item?.coverPic}
							alt="Product Cover"
						/>
						</td>
						<td className="p-2  text-sm font-medium">{item?.title}</td>
						<td className="p-2 ">{book?.product[index]?.quantity || "NA"}</td>
						<td className="p-2 ">$ {book?.product[index]?.price}</td>
					</tr>
					))}					
					</tbody>
				</table>
			</nav>
		</main>
		))
	);

	return(
		<>
		<div className="flex justify-center space-x-6 my-4">
			<NavLink
				onClick={() => setActiveTab("pending")}
				className={`px-4 py-2 rounded-full font-medium transition duration-300 
				${activeTab === "pending"
					? "bg-purple-300 text-violet-600 shadow-md"
					: "text-purple-600 hover:bg-purple-100"}`}
			>
				Pending Orders
			</NavLink>

			<NavLink
				onClick={() => setActiveTab("delivered")}
				className={`px-4 py-2 rounded-full font-medium transition duration-300 
				${activeTab === "delivered"
					? "bg-purple-300 text-violet-600 shadow-md"
					: "text-purple-600 hover:bg-purple-100"}`}
			>
				Orders Delivered
			</NavLink>
		</div>

		<section className='my-5'>
			{activeTab == "pending" && showPendingOrders()}
			{activeTab == "delivered" && showDeliveredOrders()}
		</section>
	</>
	)
}

export default UserOrders;
