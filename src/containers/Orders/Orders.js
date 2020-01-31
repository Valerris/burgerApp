import React, { Component } from "react";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		fetch("http://localhost:3001/orders", {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			}
		})
			.then(response => response.json())
			.then(json => {
				const fetchedOrders = [];

				for (let key in json) {
					fetchedOrders.push({
						...json[key],
						id: key
					});
				}

				this.setState({ loading: false, orders: fetchedOrders });
				console.log(json);
			})
			.catch(err => {
				this.setState({ loading: false });
				// throw err;
			});
	}

	render() {
		return (
			<div>
				{this.state.orders.map(order => {
					return (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
						/>
					);
				})}
			</div>
		);
	}
}

export default withErrorHandler(Orders, null);
