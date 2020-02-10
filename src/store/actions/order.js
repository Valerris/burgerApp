import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = orderData => ({
	type: actionTypes.PURCHASE_BURGER_SUCCESS,
	orderData: orderData
});

export const purchaseBurgerFail = err => ({
	type: actionTypes.PURCHASE_BURGER_FAIL,
	error: err
});

export const purchaseBurgerStart = () => ({
	type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());

		fetch(`http://localhost:3001/660/orders?auth=${token}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(orderData)
		})
			.then(response => {
				console.log(response);
				return dispatch(purchaseBurgerSuccess(orderData));
			})
			.catch(err => dispatch(purchaseBurgerFail(err)));
	};
};

export const purchaseInit = () => ({
	type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
	type: actionTypes.FETCH_ORDERS_SUCCESS,
	orders: orders
});

export const fetchOrdersFail = err => ({
	type: actionTypes.FETCH_ORDERS_FAIL,
	error: err
});

export const fetchOrdersStart = () => ({
	type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());

		fetch(`http://localhost:3001/640/orders?auth=${token}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(json => {
				if (json === "jwt malformed") {
					throw new Error("jwt malformed or invalid");
				}

				const fetchedOrders = [];

				for (let key in json) {
					fetchedOrders.push({
						...json[key],
						id: key
					});
				}

				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
