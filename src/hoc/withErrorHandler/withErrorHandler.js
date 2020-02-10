import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};

		// componentDidMount() {
		// 	this.reqInterceptor = axios.interceptors.request.use(req => {
		// 		this.setState({ error: null });
		// 		return req;
		// 	});
		// 	this.resInterceptor = axios.interceptors.response.use(
		// 		res => res,
		// 		err => {
		// 			this.setState({ error: err });
		// 		}
		// 	);
		// }

		// componentWillUnmount() {
		// 	axios.interceptors.request.eject(this.reqInterceptor);
		// 	axios.interceptors.request.eject(this.resInterceptor);
		// }

		// static getDerivedStateFromError(err) {
		// 	console.log("catched error");
		// 	this.setState({ error: err });
		// 	return { error: err };
		// }

		// componentDidCatch(err) {
		// 	console.log("catched error");
		// 	this.setState({ error: err });
		// }

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Aux>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
