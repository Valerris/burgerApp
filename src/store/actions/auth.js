import * as actionTypes from "./actionTypes";

export const authStart = () => ({
	type: actionTypes.AUTH_START
});

export const authSuccess = token => ({
	type: actionTypes.AUTH_SUCCESS,
	token: token
});

export const authFail = err => ({
	type: actionTypes.AUTH_FAIL,
	error: err
});

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");

	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = (expirationTime = 3600 * 1000) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		const authData = {
			email: email,
			password: password
		};

		dispatch(authStart());

		let url = "http://localhost:3001";

		if (isSignup) {
			url += "/signup";
		} else {
			url += "/signin";
		}

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(authData)
		})
			.then(response => response.json())
			.then(json => {
				if (json === "Email and password are required") {
					throw new Error("Error: email and password are required.");
				}

				if (json === "Email already exists") {
					throw new Error("Error: email already exists.");
				}

				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

				localStorage.setItem("token", json.accessToken);
				localStorage.setItem("expirationDate", expirationDate);

				dispatch(authSuccess(json.accessToken));
				dispatch(checkAuthTimeout());
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err));
			});
	};
};

export const setAuthRedirectPath = path => ({
	type: actionTypes.SET_AUTH_REDIRECT_PATH,
	path: path
});

export const authCheckState = () => dispatch => {
	const token = localStorage.getItem("token");

	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(localStorage.getItem("expirationDate"));

		if (expirationDate < new Date()) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(token));
			dispatch(
				checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
			);
		}
	}
};
