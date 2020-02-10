import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token);
	}

	render() {
		let orders = <Spinner />;

		if (!this.props.loading) {
			orders = this.props.orders.map(order => {
				return (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				);
			});
		}

		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	onFetchOrders: token => dispatch(actions.fetchOrders(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, null));
