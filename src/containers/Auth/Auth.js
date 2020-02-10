import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/auth";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elType: "input",
				elConfig: {
					type: "email",
					placeholder: "E-mail"
				},
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elType: "input",
				elConfig: {
					type: "password",
					placeholder: "Password"
				},
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignup: true
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (e, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: e.target.value,
				valid: checkValidity(
					e.target.value,
					this.state.controls[controlName].validation
				),
				touched: true
			})
		});

		this.setState({ controls: updatedControls });
	};

	submitHandler(e) {
		e.preventDefault();

		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => ({
			isSignup: !prevState.isSignup
		}));
	};

	render() {
		let formElementsArr = [];

		for (let key in this.state.controls) {
			formElementsArr.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArr.map(el => (
			<Input
				key={el.id}
				elType={el.config.elType}
				elConfig={el.config.elConfig}
				value={el.config.value}
				shouldValidate={el.config.validation}
				invalid={!el.config.valid}
				touched={el.config.touched}
				changed={e => {
					this.inputChangedHandler(e, el.id);
				}}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMsg = null;

		if (this.props.error) {
			errorMsg = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;

		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				<form
					onSubmit={e => {
						this.submitHandler(e);
					}}
				>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignup ? "SIGN-IN" : "SIGN-UP"}
				</Button>
				{errorMsg}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.auth.loading,
	error: state.auth.error,
	isAuthenticated: state.auth.token !== null,
	buildingBurger: state.burgerBuilder.building,
	authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
	onAuth: (email, password, isSignup) =>
		dispatch(actions.auth(email, password, isSignup)),
	onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
