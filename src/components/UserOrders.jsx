

import React from 'react'
import { NavLink } from 'react-router-dom';

const UserOrders = () => {
	return (
	<div>
		<NavLink>
			Pending Orders
		</NavLink>
		<NavLink>
			Orders Delivered
		</NavLink>

		<p>show data here</p>
	</div>
	)
}

export default UserOrders;
